from user_primer_server.settings.base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    },
}

STATIC_URL = '/static/'
STATIC_ROOT = '/var/www/server/static/'
