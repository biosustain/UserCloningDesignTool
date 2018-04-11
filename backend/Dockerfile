FROM python:latest
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y build-essential python3-dev libldap2-dev libsasl2-dev ldap-utils
RUN mkdir -p /var/www/server
WORKDIR /var/www/server/
COPY . .
RUN pip install -r requirements.txt
RUN python manage.py collectstatic --no-input
