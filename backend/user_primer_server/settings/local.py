from user_primer_server.settings.base import *

DATABASES = {
  'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'dev_db',
    }  
}
