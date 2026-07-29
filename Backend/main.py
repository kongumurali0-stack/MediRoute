from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from workflow import MediRouteWorkflow

from database.database import Base, engine, SessionLocal
from database.models import EmergencyRequest, Inventory
from database.schemas import EmergencyRequestCreate

import database.models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MediRoute API",
    version="1.0"
)

# ---------------- CORS ---------------- #

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

workflow = MediRouteWorkflow()


# ---------------- DATABASE SESSION ---------------- #

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- HOME ---------------- #

@app.get("/")
def home():
    return {
        "message": "Welcome to MediRoute API",
        "status": "Running"
    }


# ---------------- DEMO ---------------- #

@app.get("/demo")
def demo(db: Session = Depends(get_db)):
    result = workflow.process_request(
        disease="Heart Attack",
        medicine="Blood",
        quantity=2,
        temperature=5,
        db=db
    )
    return result


# ---------------- CREATE REQUEST ---------------- #

@app.post("/request")
def create_request(
    request: EmergencyRequestCreate,
    db: Session = Depends(get_db)
):
    result = workflow.process_request(
        disease=request.disease,
        medicine=request.medicine,
        quantity=request.quantity,
        temperature=5,
        db=db
    )

    new_request = EmergencyRequest(
        patient_name=request.patient_name,
        disease=request.disease,
        medicine=request.medicine,
        quantity=request.quantity,
        priority=result["priority"],
        status="Pending"
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    return {
        "message": "Emergency Request Created Successfully",
        "request_id": new_request.id,
        "agent_result": result
    }


# ---------------- GET REQUESTS ---------------- #

@app.get("/requests")
def get_requests(db: Session = Depends(get_db)):
    return db.query(EmergencyRequest).all()


# ---------------- ADD INVENTORY ---------------- #

@app.post("/inventory")
def add_inventory(
    hospital: str,
    medicine: str,
    quantity: int,
    minimum_stock: int,
    db: Session = Depends(get_db)
):
    item = Inventory(
        hospital=hospital,
        medicine=medicine,
        quantity=quantity,
        minimum_stock=minimum_stock
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return {
        "message": "Inventory Added Successfully",
        "id": item.id
    }


# ---------------- GET INVENTORY ---------------- #

@app.get("/inventory")
def get_inventory(db: Session = Depends(get_db)):
    return db.query(Inventory).all()