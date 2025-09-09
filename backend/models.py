from sqlalchemy import Column, Integer, Float, Date
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class NFPData(Base):
    __tablename__ = "nfp_data"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, index=True)
    value = Column(Float)
    nfp_change = Column(Float)

class CPIData(Base):
    __tablename__ = "cpi_data"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, index=True)
    value = Column(Float)
    cpi_change = Column(Float)

class PPIData(Base):
    __tablename__ = "ppi_data"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, index=True)
    value = Column(Float)
    ppi_change = Column(Float)

class ReSaData(Base):
    __tablename__ = "retail_sales_data"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, index=True)
    value = Column(Float)
    re_sa_change = Column(Float)

class PCEData(Base):
    __tablename__ = "pce_data"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, index=True)
    value = Column(Float)
    pce_change = Column(Float)

class initialJobData(Base):
    __tablename__ = "initial_job_data"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, index=True)
    value = Column(Float)
    initial_job_change = Column(Float)