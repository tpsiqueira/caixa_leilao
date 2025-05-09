from fastapi import APIRouter, Depends
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
def listar_imoveis(db: Session = Depends(get_db)):
    return db.query(Imovel).all()
