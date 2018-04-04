from django.apps import AppConfig


class JwtAuthenticationConfig(AppConfig):
    name = 'jwt_authentication'

    def ready(self):
        import jwt_authentication.signals
