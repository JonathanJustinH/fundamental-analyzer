from fastapi import APIRouter, HTTPException
import os, requests
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

API_KEY = os.getenv("QUANDL_API_KEY")
BASE = "https://data.nasdaq.com/api/v3/datatables"

@router.get("/cot/legacy/latest")
def get_latest_two(contract_code: str):
    if not API_KEY:
        raise HTTPException(500, "API key not configured")

    url = f"{BASE}/QDL/LFON"
    params = {
        "contract_code": contract_code,
        "api_key": API_KEY,
        "qopts.per_page": 2
    }

    res = requests.get(url, params=params)
    if res.status_code != 200:
        raise HTTPException(res.status_code, res.text)

    data = res.json()
    rows = data["datatable"]["data"]
    cols = [col["name"] for col in data["datatable"]["columns"]]

    latest_two = [dict(zip(cols, row)) for row in rows]

    return latest_two
