# Backend DAV Motors

Здесь используется SMTP Mail.ru через FastAPI.

## 1. Создайте пароль для внешнего приложения

В Почте Mail:
Настройки → Все настройки → Безопасность → Пароли для внешних приложений → Создать.

Выберите доступ «Только отправка писем в Почте», если Mail предлагает выбрать тип доступа.

## 2. Создайте `.env`

Скопируйте `.env.example` в `.env` и вставьте сгенерированный пароль:

MAIL_USERNAME=6loki@mail.ru
MAIL_PASSWORD=ВАШ_ПАРОЛЬ_ВНЕШНЕГО_ПРИЛОЖЕНИЯ
MAIL_TO=6loki@mail.ru

Обычный пароль от почты в проект вставлять не нужно.

## 3. Установка

```bash
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
# source .venv/bin/activate

pip install -r backend/requirements.txt
```

## 4. Запуск

Из корня проекта:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

Откройте:
http://127.0.0.1:8000

После отправки формы письмо будет приходить на `6loki@mail.ru`.

## SMTP

Сервер: `smtp.mail.ru`
Порт: `465`
Шифрование: SSL/TLS
Логин: `6loki@mail.ru`
Пароль: пароль для внешнего приложения
