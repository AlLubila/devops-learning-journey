import os

from fastapi import FastAPI
from psycopg2 import connect
from psycopg2.extras import RealDictCursor

app = FastAPI(title="DataPulse API", version="0.1.0")


def get_connection():
    database_url = os.getenv("DATABASE_URL")

    if not database_url:
        raise RuntimeError("La variable DATABASE_URL n'est pas définie.")

    return connect(database_url, cursor_factory=RealDictCursor)


@app.get("/")
def root():
    return {
        "message": "Bienvenue sur l'API DataPulse Beta",
        "database_configured": bool(os.getenv("DATABASE_URL")),
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/database-check")
def database_check():
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT current_database() AS database_name;")
            result = cursor.fetchone()

        return {
            "status": "connected",
            "database": result["database_name"],
        }
    finally:
        connection.close()

