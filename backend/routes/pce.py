from fastapi import APIRouter, HTTPException
import pandas as pd
import numpy as np
from fredapi import Fred
from sqlalchemy.orm import Session
from models import PCEData, Base
from database import engine, SessionLocal
import os

router = APIRouter()
Base.metadata.create_all(bind=engine)

@router.get("/economic/pce")
def get_pce_history():
    api_key = os.getenv("FRED_API_KEY")
    if not api_key:
        raise HTTPException(500, "API key not configured")
    db: Session = SessionLocal()
    try:
        fred = Fred(api_key=api_key)
        data = fred.get_series("PCEPILFE")  
        df = pd.DataFrame(data)
        df.reset_index(inplace=True)
        df.columns = ["date", "value"]

        df["date"] = df["date"].dt.date
        df["pce_change"] = round(df["value"].pct_change(periods=12) * 100, 1)

        df = df.replace([np.nan, np.inf, -np.inf, pd.NA, pd.NaT], None)

        for _, row in df.iterrows():
            if not db.query(PCEData).filter(PCEData.date == row["date"]).first():
                db.add(PCEData(date=row["date"], value=row["value"], pce_change=row["pce_change"]))
        db.commit()

        records = db.query(PCEData).order_by(PCEData.date.desc()).limit(120).all()


        return {
            "series": "PCEPILFE (Personal Consumption Expenditures Excluding Food and Energy (Chain-Type Price Index))",
            "unit": "Percent",
            "data": [
                {
                    "date": r.date,
                    "value": r.value,
                    "pce_change": r.pce_change
                }
                for r in records
            ]
        }
    except Exception as e:
        raise HTTPException(500, detail=str(e))
    finally:
        db.close()
