#!/bin/bash

# Set the settings for the docker
export DJANGO_SETTINGS_MODULE=user_primer_server.settings.docker

# Setup database structure
python /var/www/server/manage.py collectstatic --no-input
python /var/www/server/manage.py makemigrations
python /var/www/server/manage.py migrate

# Start the service
exec /usr/local/bin/uwsgi --ini /etc/uwsgi/uwsgi.ini
# python /var/www/server/manage.py runserver 0.0.0.0:8000
