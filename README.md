# Fundamental Analyzer

A full-stack web application for visualizing and analyzing key US economic indicators. Built with React and FastAPI.

---

## Features
- Interactive charts and tables for NFP, CPI, PPI, PCE, Retail Sales, and more
- Modular FastAPI backend with RESTful API endpoints
- SQLite database for database storage
- Simple and modern UI
- Mock data for easy demo/testing

---

## Built With
- **Frontend:** React, TypeScript
- **Backend:** FastAPI, SQLAlchemy, SQLite
- **Testing:** Pytest, FastAPI TestClient

---

## Project Structure
```
fundementalanalyzer/
├── backend/
│   ├── main.py           # FastAPI app
│   ├── models.py         # SQLAlchemy models
│   ├── database.py       # DB connection
│   ├── routes/           # API route modules
│   ├── economic.db       # SQLite database
│   └── test_main.py      # Pytest example
├── src/                  # React frontend
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── data/             # Mock/sample data
│   └── ...
├── public/               # Static assets
├── .env                  # Environment variables
├── .env.example          # Example env file
├── README.md
└── ...
```

---

### Setup & Usage

### 1. Clone the repository
```sh
git clone https://github.com/jonathanharyanto/fundementalanalyzer.git
cd fundementalanalyzer
```

### 2. Environment Variables
- Copy `.env.example` to `.env` and fill in your API keys:
```
QUANDL_API_KEY=your_api_key_here
```

### 3. Backend Setup
```sh
cd backend
python -m venv .venv
.venv\Scripts\activate  # for Windows
pip install fastapi uvicorn sqlalchemy python-dotenv pytest
```

#### Database Path Fix
- The database will always be created in the backend folder.

### 4. Run Backend
```sh
uvicorn main:app --reload
```

### 5. Frontend Setup
```sh
cd ../
npm install
npm start
```

---

## API Endpoints (Sample)
- `GET /` — Health check
- `GET /cot/legacy/latest?contract_code=...` — Latest COT data
- ... (see backend/routes/ for more)

---

## Testing (Backend)

### Example Test: `backend/test_main.py`
```python
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
	response = client.get("/")
	assert response.status_code == 200
	assert response.json() == {"Hello": "world"}
```

### Run tests:
```sh
cd backend
pytest
```

---

## Screenshots
<!-- ![Dashboard Example](screenshots/dashboard.png) -->

---

## Deployment
- -

---

## Credits
- Built by Jonathan Justin Haryanto
- Data via FRED

---
