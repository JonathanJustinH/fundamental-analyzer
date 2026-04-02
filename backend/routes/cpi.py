from fastapi import APIRouter, HTTPException
import pandas as pd
import numpy as np
from fredapi import Fred
from sqlalchemy.orm import Session
from models import CPIData, Base
from database import engine, SessionLocal
import os

router = APIRouter()
Base.metadata.create_all(bind=engine)


# GET: Only read from DB
@router.get("/economic/cpi")
def get_cpi_history():
    db: Session = SessionLocal()
    try:
        records = db.query(CPIData).order_by(CPIData.date.desc()).limit(120).all()
        return {
            "series": "FPCPITOTLZGUSA (Inflation, consumer prices for the United States)",
            "unit": "Percent",
            "data": [
                {
                    "date": r.date,
                    "value": r.value,
                    "cpi_change": r.cpi_change
                }
                for r in records
            ]
        }
    except Exception as e:
        raise HTTPException(500, detail=str(e))
    finally:
        db.close()

# POST: Update DB from FRED
@router.post("/economic/cpi/update")
def update_cpi_history():
    api_key = os.getenv("FRED_API_KEY")
    if not api_key:
        raise HTTPException(500, "API key not configured")
    db: Session = SessionLocal()
    try:
        fred = Fred(api_key=api_key)
        data = fred.get_series("CPIAUCSL")  
        df = pd.DataFrame(data)
        df.reset_index(inplace=True)
        df.columns = ["date", "value"]

        df["date"] = df["date"].dt.date
        df["cpi_change"] = round(df["value"].pct_change(periods=12) * 100, 1)

        df = df.replace([np.nan, np.inf, -np.inf, pd.NA, pd.NaT], None)

        # Bulk insert optimization
        existing_dates = set(r[0] for r in db.query(CPIData.date).all())
        new_records = [
            CPIData(date=row["date"], value=row["value"], cpi_change=row["cpi_change"])
            for _, row in df.iterrows() if row["date"] not in existing_dates
        ]
        if new_records:
            db.bulk_save_objects(new_records)
            db.commit()
        return {"message": f"CPI data updated. Inserted {len(new_records)} new records."}
    except Exception as e:
        raise HTTPException(500, detail=str(e))
    finally:
        db.close()
