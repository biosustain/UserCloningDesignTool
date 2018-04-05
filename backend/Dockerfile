FROM python:latest
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y libsasl2-dev libldap2-dev
RUN mkdir -p /var/www/server
WORKDIR /var/www/server/
COPY . .
RUN pip install -r requirements.txt
RUN python manage.py collectstatic --no-input
RUN python manage.py makemigrations
RUN python manage.py migrate
