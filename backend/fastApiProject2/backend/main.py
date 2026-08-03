import os
import smtplib
from email.message import EmailMessage
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import uvicorn

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

app = FastAPI(title="DAV Motors API")

app.mount("/assets", StaticFiles(directory=BASE_DIR / "assets"), name="assets")


class Lead(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    phone: str = Field(min_length=7, max_length=40)
    car: str = Field(default="", max_length=200)
    source: str = Field(default="website", max_length=50)


@app.get("/")
async def index():
    return FileResponse(BASE_DIR / "index.html")


@app.get("/styles.css")
async def styles():
    return FileResponse(BASE_DIR / "styles.css", media_type="text/css")


@app.get("/script.js")
async def script():
    return FileResponse(BASE_DIR / "script.js", media_type="application/javascript")


@app.get("/forms.js")
async def forms():
    return FileResponse(BASE_DIR / "forms.js", media_type="application/javascript")


def send_mail(lead: Lead) -> None:
    smtp_user = os.getenv("MAIL_USERNAME", "6loki@mail.ru")
    smtp_password = os.getenv("MAIL_PASSWORD")
    print(smtp_password)
    recipient = os.getenv("MAIL_TO", "6loki@mail.ru")
    print(recipient)

    if not smtp_password:
        raise RuntimeError("MAIL_PASSWORD is not configured")

    message = EmailMessage()
    message["Subject"] = f"DAV Motors — новая заявка от {lead.name}"
    message["From"] = smtp_user
    message["To"] = recipient

    message.set_content(
        f"""Новая заявка с сайта DAV Motors

Имя: {lead.name}
Телефон: {lead.phone}
Автомобиль: {lead.car or "не указан"}
Источник: {lead.source}

Телефон DAV Motors: +7 924 006-63-44
ИНН: 123456733
"""
    )

    # Mail.ru: SMTP over SSL, port 465.
    with smtplib.SMTP_SSL("smtp.mail.ru", 465, timeout=20) as smtp:
        smtp.login(smtp_user, smtp_password)
        smtp.send_message(message)


@app.post("/api/lead")
async def create_lead(lead: Lead):
    try:
        send_mail(lead)
    except Exception as exc:
        print(f"MAIL ERROR: {exc}")
        raise HTTPException(
            status_code=500,
            detail="Не удалось отправить письмо"
        )

    return {"ok": True}
def start_app():
    uvicorn.run(app='backend.main:app', host="127.0.0.1", port=8000, reload=True)

if __name__ == "__main__":
    start_app()
