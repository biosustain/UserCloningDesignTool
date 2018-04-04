from user_primer_server.settings.base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dev_db',
        'USER': 'django',
        'PASSWORD': 'mydb123',
        'HOST': 'localhost',
        'PORT': '',
    }
}

# We don't need a fancy password, when we are only testing the functionality
AUTH_PASSWORD_VALIDATORS = []
