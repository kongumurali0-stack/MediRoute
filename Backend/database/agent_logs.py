from sqlalchemy import Column, Integer, String
from database.database import Base


class AgentLog(Base):
    __tablename__ = "agent_logs"

    id = Column(Integer, primary_key=True, index=True)
    agent = Column(String)
    action = Column(String)
    result = Column(String)