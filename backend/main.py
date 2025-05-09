from fastapi import FastAPI
from api.routes import router
from database.connection import init_db

app = FastAPI()
init_db()

app.include_router(router)
