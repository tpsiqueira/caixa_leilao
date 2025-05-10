from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database.connection import SessionLocal
from database.models import Imovel

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/imoveis/")
def listar_imoveis(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(500, le=500)
):
    return db.query(Imovel).offset(skip).limit(limit).all()
