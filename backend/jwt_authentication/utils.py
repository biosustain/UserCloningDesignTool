from .signals import jwt_obtained


def jwt_response_payload_handler(token, user=None, request=None):
    '''This method is set as the default jwt handler in
    user_primer_server.settings.base.py'''
    if hasattr(request, 'data'):
        if 'username' in request.data:
            jwt_obtained.send(sender='jwt', user=user, request=request)
    return {
        'token': token,
        # The ice_token is set in the signal method
        'ice_token': user.iceuserprofile.ice_token,
    }
