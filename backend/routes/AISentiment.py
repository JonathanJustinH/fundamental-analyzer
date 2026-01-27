from fastapi import APIRouter, HTTPException, Body
from typing import Optional, Dict, Any, List, Tuple
import importlib
from sqlalchemy.orm import Session
from database import SessionLocal
from datetime import datetime

router = APIRouter()

CANDIDATES = [
    ("NFP", "NFPData", "value", "nfp_change"),
    ("CPI", "CPIData", "value", "cpi_change"),
    ("PPI", "PPIData", "value", "ppi_change"),
    ("PCE", "PCEData", "value", "pce_change"),
    ("RetailSales", "ReSaData", "value", "re_sa_change"),
    ("InitialJobs", "initialJobData", "value", "initial_job_change"),
]

def fetch_series(model_cls, value_field: str, limit: int = 20) -> List[Tuple[Any, Any]]:
    db: Session = SessionLocal()
    try:
        rows = db.query(model_cls).order_by(model_cls.date.desc()).limit(limit).all()
        rows = list(reversed(rows))
        series = []
        for r in rows:
            dt = getattr(r, "date", None)
            val = getattr(r, value_field, None)
            if val is None:
                continue
            series.append((dt, float(val)))
        return series
    finally:
        db.close()

def compute_percent_change(series: List[Tuple[Any, float]]) -> float:
    if not series or len(series) < 2:
        return 0.0
    first = series[0][1]
    last = series[-1][1]
    try:
        if abs(first) > 1e-8:
            return (last - first) / abs(first)
        else:
            avg = sum(abs(v) for _, v in series) / max(1, len(series))
            denom = avg if avg > 1e-8 else 1.0
            return (last - first) / denom
    except Exception:
        return 0.0

def percent_to_signed(pct: float, scale: float = 0.05) -> float:
    try:
        signed = pct / scale
    except Exception:
        signed = 0.0
    if signed > 1.0:
        signed = 1.0
    if signed < -1.0:
        signed = -1.0
    return signed

@router.post("/sentiment/{currency}")
def ai_sentiment_trend(currency: str, payload: Optional[Dict[str, Any]] = Body(None), lookback: int = 20):
    indicators_input = payload or {}
    per_indicator: List[Dict[str, Any]] = []
    signed_values: List[float] = []

    try:
        models = importlib.import_module("models")
    except Exception:
        models = None

    for label, model_name, value_field, _ in CANDIDATES:
        series: List[Tuple[Any, float]] = []
        if label in indicators_input:
            raw = indicators_input[label]
            try:
                series = []
                for item in raw[-lookback:]:
                    d = item.get("date") if isinstance(item, dict) else None
                    v = item.get("value") if isinstance(item, dict) else None
                    if v is None:
                        continue
                    series.append((d, float(v)))
            except Exception:
                series = []
        else:
            if models is not None and hasattr(models, model_name):
                model_cls = getattr(models, model_name)
                try:
                    series = fetch_series(model_cls, value_field, limit=lookback)
                except Exception:
                    series = []
        pct = compute_percent_change(series)
        signed = percent_to_signed(pct, scale=0.05)
        per_indicator.append({
            "name": label,
            "percent": round(pct, 6),
            "signed": round(signed, 4),
            "points": len(series)
        })
        signed_values.append(signed)

    if not signed_values:
        raise HTTPException(status_code=400, detail="No indicator series found in DB and no payload provided.")

    avg_signed = float(sum(signed_values) / len(signed_values))
    threshold = 0.05
    if avg_signed > threshold:
        overall = "Bullish"
    elif avg_signed < -threshold:
        overall = "Bearish"
    else:
        overall = "Neutral"
    score = round(min(1.0, max(0.0, abs(avg_signed))), 3)

    ups = [p for p in per_indicator if p["signed"] > 0.05]
    downs = [p for p in per_indicator if p["signed"] < -0.05]
    neutral = [p for p in per_indicator if -0.05 <= p["signed"] <= 0.05]

    parts = []
    if ups:
        parts.append(f"{len(ups)} indicator(s) trending higher ({', '.join([p['name'] for p in ups])})")
    if downs:
        parts.append(f"{len(downs)} indicator(s) trending lower ({', '.join([p['name'] for p in downs])})")
    if neutral:
        parts.append(f"{len(neutral)} indicator(s) neutral or inconclusive")
    para1 = "Overall trend signals: " + (", ".join(parts) + ".") if parts else "No trend data available."

    if overall == "Bullish":
        para2 = "Recent trends point toward USD strength. The majority of indicators have risen over the lookback window, which typically supports tighter policy expectations or stronger economic activity, favoring the dollar."
    elif overall == "Bearish":
        para2 = "Recent trends point toward USD weakness. Several indicators have declined over the lookback window, which can reduce the case for near-term tightening and weigh on the dollar."
    else:
        para2 = "Recent trends are mixed or small in magnitude, producing a neutral view, watch upcoming releases for clearer directional evidence."

    explanation = para1 + "\n\n" + para2

    return {
        "sentiment": overall,
        "score": score,
        "explanation": explanation,
        "per_indicator": per_indicator,
        "lookback": lookback,
        "generated_at": datetime.utcnow().isoformat() + "Z"
    }