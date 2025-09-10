from fastapi import FastAPI
from routes import cot, nfp, cpi, ppi, reSa, pce, initialJob
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(cot.router)
app.include_router(nfp.router)
app.include_router(cpi.router)
app.include_router(ppi.router)
app.include_router(reSa.router)
app.include_router(pce.router)
app.include_router(initialJob.router)

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
