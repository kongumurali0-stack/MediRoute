from sqlalchemy import Column, Integer, String
from database.database import Base


class EmergencyRequest(Base):
    __tablename__ = "emergency_requests"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String)
    disease = Column(String)
    medicine = Column(String)
    quantity = Column(Integer)
    priority = Column(String)
    status = Column(String)


class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)
    hospital = Column(String)
    medicine = Column(String)
    quantity = Column(Integer)
    minimum_stock = Column(Integer)