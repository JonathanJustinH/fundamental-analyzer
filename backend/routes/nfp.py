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


# GET: Only read from DB
@router.get("/economic/nfp")
def get_nfp_history():
    db: Session = SessionLocal()
    try:
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

# POST: Update DB from FRED
@router.post("/economic/nfp/update")
def update_nfp_history():
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

        # Fetch all existing dates in one query for efficiency
        existing_dates = set(r[0] for r in db.query(NFPData.date).all())
        new_records = []
        for _, row in df.iterrows():
            if row["date"] not in existing_dates:
                new_records.append(NFPData(date=row["date"], value=row["value"], nfp_change=row["nfp_change"]))
        if new_records:
            db.add_all(new_records)
            db.commit()
        return {"message": f"NFP data updated from FRED. {len(new_records)} new records added."}
    except Exception as e:
        raise HTTPException(500, detail=str(e))
    finally:
        db.close()
