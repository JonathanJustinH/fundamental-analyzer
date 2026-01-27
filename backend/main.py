from fastapi import FastAPI
from dotenv import load_dotenv
from routes import cot, nfp, cpi, ppi, reSa, pce, initialJob, AISentiment
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()


app.include_router(cot.router)
app.include_router(nfp.router)
app.include_router(cpi.router)
app.include_router(ppi.router)
app.include_router(reSa.router)
app.include_router(pce.router)
app.include_router(initialJob.router)
app.include_router(AISentiment.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://fundamental-analyzer.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"Hello": "world"}
