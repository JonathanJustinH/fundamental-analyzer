from fastapi import APIRouter, HTTPException
import pandas as pd
import numpy as np
from fredapi import Fred
from sqlalchemy.orm import Session
from models import NFPData, Base
from database import engine, SessionLocal
import os

router = APIRouter()
Base.metadata.create_all(bind=engine)

@router.get("/economic/nfp")
def get_nfp_history():
    api_key = os.getenv("FRED_API_KEY")
    if not api_key:
        raise HTTPException(500, "API key not configured")
    db: Session = SessionLocal()
    try:
        fred = Fred(api_key=api_key)
        data = fred.get_series("PAYEMS")  
        df = pd.DataFrame(data)
        df.reset_index(inplace=True)
        df.columns = ["date", "value"]

        df["date"] = df["date"].dt.date
        df["nfp_change"] = df["value"].diff()

        df = df.replace([np.nan, np.inf, -np.inf, pd.NA, pd.NaT], None)

        for _, row in df.iterrows():
            if not db.query(NFPData).filter(NFPData.date == row["date"]).first():
                db.add(NFPData(date=row["date"], value=row["value"], nfp_change=row["nfp_change"]))
        db.commit()

        records = db.query(NFPData).order_by(NFPData.date.desc()).limit(120).all()


        return {
            "series": "PAYEMS (Nonfarm Payrolls, Thousands of Jobs)",
            "unit": "Thousands",
            "data": [
                {
                    "date": r.date,
                    "value": r.value,
                    "nfp_change": r.nfp_change
                }
                for r in records
            ]
        }
    except Exception as e:
        raise HTTPException(500, detail=str(e))
    finally:
        db.close()
