from fastapi import APIRouter, HTTPException
import pandas as pd
import numpy as np
from fredapi import Fred
from sqlalchemy.orm import Session
from models import ReSaData, Base
from database import engine, SessionLocal
import os

router = APIRouter()
Base.metadata.create_all(bind=engine)

@router.get("/economic/retail_sales")
def get_re_sa_history():
    api_key = os.getenv("FRED_API_KEY")
    if not api_key:
        raise HTTPException(500, "API key not configured")
    db: Session = SessionLocal()
    try:
        fred = Fred(api_key=api_key)
        data = fred.get_series("RSAFS")  
        df = pd.DataFrame(data)
        df.reset_index(inplace=True)
        df.columns = ["date", "value"]

        df["date"] = df["date"].dt.date
        df["re_sa_change"] = round(df["value"].pct_change() * 100, 1)

        df = df.replace([np.nan, np.inf, -np.inf, pd.NA, pd.NaT], None)

        for _, row in df.iterrows():
            if not db.query(ReSaData).filter(ReSaData.date == row["date"]).first():
                db.add(ReSaData(date=row["date"], value=row["value"], re_sa_change=row["re_sa_change"]))
        db.commit()

        records = db.query(ReSaData).order_by(ReSaData.date.desc()).limit(120).all()


        return {
            "series": "RSAFS (Advance Retail Sales: Retail Trade and Food Services)",
            "unit": "Percent",
            "data": [
                {
                    "date": r.date,
                    "value": r.value,
                    "re_sa_change": r.re_sa_change
                }
                for r in records
            ]
        }
    except Exception as e:
        raise HTTPException(500, detail=str(e))
    finally:
        db.close()