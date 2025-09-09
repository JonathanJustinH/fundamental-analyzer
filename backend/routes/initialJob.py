from fastapi import APIRouter, HTTPException
import pandas as pd
import numpy as np
from fredapi import Fred
from sqlalchemy.orm import Session
from models import initialJobData, Base
from database import engine, SessionLocal
import os

router = APIRouter()
Base.metadata.create_all(bind=engine)

@router.get("/economic/initial-jobs")
def get_initial_job_history():
    api_key = os.getenv("FRED_API_KEY")
    if not api_key:
        raise HTTPException(500, "API key not configured")
    db: Session = SessionLocal()
    try:
        fred = Fred(api_key=api_key)
        data = fred.get_series("ICSA")  
        df = pd.DataFrame(data)
        df.reset_index(inplace=True)
        df.columns = ["date", "value"]

        df["date"] = df["date"].dt.date
        df["initial_job_change"] = df["value"] / 1000

        df = df.replace([np.nan, np.inf, -np.inf, pd.NA, pd.NaT], None)

        for _, row in df.iterrows():
            if not db.query(initialJobData).filter(initialJobData.date == row["date"]).first():
                db.add(initialJobData(date=row["date"], value=row["value"], initial_job_change=row["initial_job_change"]))
        db.commit()

        records = db.query(initialJobData).order_by(initialJobData.date.desc()).limit(500).all()


        return {
            "series": "ICSA (Initial Claims)",
            "unit": "Number",
            "data": [
                {
                    "date": r.date,
                    "value": r.value,
                    "initial_job_change": r.initial_job_change
                }
                for r in records
            ]
        }
    except Exception as e:
        raise HTTPException(500, detail=str(e))
    finally:
        db.close()
