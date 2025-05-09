from sqlalchemy import Column, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Imovel(Base):
    __tablename__ = "imoveis"

    numero_imovel = Column(String, primary_key=True)
    uf = Column(String(2))
    cidade = Column(String(100))
    bairro = Column(String(100))
    endereco = Column(Text)
    preco = Column(String(20))
    valor_avaliacao = Column(String(20))
    desconto = Column(String(10))
    descricao = Column(Text)
    modalidade = Column(String(100))
    link = Column(Text)
    categoria = Column(String(50))
    tipo = Column(String(100)) 
