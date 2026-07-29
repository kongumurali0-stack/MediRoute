from pydantic import BaseModel


class EmergencyRequestCreate(BaseModel):
    patient_name: str
    disease: str
    medicine: str
    quantity: int


class EmergencyRequestResponse(EmergencyRequestCreate):
    id: int
    priority: str
    status: str

    class Config:
        from_attributes = True