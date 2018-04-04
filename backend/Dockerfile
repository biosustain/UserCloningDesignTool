FROM python:latest
ENV PYTHONUNBUFFERED 1

# Requirements for ldap
RUN apt-get update && apt-get dist-upgrade -y && apt-get autoremove -y && apt-get install -y libsasl2-dev libldap2-dev

# Copy uwsgi settings
RUN mkdir /etc/uwsgi/
COPY confs/uwsgi/uwsgi.ini /etc/uwsgi/

# Python requirements
RUN pip install -U pip setuptools wheel

WORKDIR /var/www/
COPY confs/requirements.txt /var/www/
RUN pip install -r requirements.txt

WORKDIR /var/www/server/
COPY . .

# Copy entrypoint script
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh