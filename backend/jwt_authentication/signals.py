from .models import IceUserProfile
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.utils.datastructures import MultiValueDictKeyError
from django_auth_ldap.backend import ldap_error
import django.dispatch
from urllib.error import HTTPError


# signal dispatcher for when user logs in
jwt_obtained = django.dispatch.Signal(providing_args=['user', 'request'])


def create_ice_login(sender, instance, **kwargs):
    '''Create a new ice user profile when a new user is created'''
    user = IceUserProfile.objects.get_or_create(user=instance)[0]
    user.save()


post_save.connect(create_ice_login, sender=User)


def print_ldap_errors(sender, context, user, exception, **kw):
    print('LDAP error!')
    print(context, user, exception, kw)
    assert False


ldap_error.connect(print_ldap_errors)


def login_to_ice(sender, user, request, **kwargs):
    '''Updates the ice_token when signal fires'''
    from ice import settings

    try:
        # The username is in post for django signals and data for jwt signals
        if 'username' in request.POST:
            username = request.POST['username']
            password = request.POST['password']
        elif hasattr(request, 'data'):
            if 'username' in request.data:
                username = request.data['username']
                password = request.data['password']
    except MultiValueDictKeyError as e:
        raise e

    try:
        # TODO: This is a hacky solution and not very elegant. It needs refactoring
        # Needs better exception handling for instance
        ice_user = user.iceuserprofile

        setting = {
            "USER_NAME": username,
            "PASSWORD": password,
            "HOST": 'ice.ebdrup.biosustain.dtu.dk',
            "PORT": '443',
        }
        ice_settings = settings.IceSettings(setting)
        ice_comm = ice_user.ice_comm
        ice_comm.settings = ice_settings
        try:
            ice_user.ice_token = ice_comm.get_token()
        except Exception as e:
            print(f'{user} did not succesfully log in')
            print("e args", e.args)
            print("e reason", e.args[0].reason)
            raise e
        print(f'{user} got ice token: {ice_user.ice_token}')
        ice_user.save()
        user.save()
        return ice_user
    except HTTPError:
        # In case of the user not being an ldap user, we need to just return
        # from the function
        # This solution does not take into account if ice is down
        return


jwt_obtained.connect(login_to_ice)
user_logged_in.connect(login_to_ice)


def logout_off_ice(sender, user, request, **kw):
    '''Removes the ice token from the database when signal fires'''
    try:
        ice_user = user.iceuserprofile
        ice_user.ice_token = None
        ice_user.save()
    except Exception as e:
        raise e


user_logged_out.connect(logout_off_ice)
