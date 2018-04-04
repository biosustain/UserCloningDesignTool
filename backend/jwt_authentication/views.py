from rest_framework_jwt.views import ObtainJSONWebToken


# Create your views here.
class SignalObtainJSONWebToken(ObtainJSONWebToken):
    def post(self, request, *args, **kwargs):
        # TODO: exception handling
        response = super().post(request, *args, **kwargs)

        return response


class InvalidateJSONWebToken:

    def post(self, request, *args, **kwargs):
        pass
