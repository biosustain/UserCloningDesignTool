import factory
from django.db.models.signals import post_save
from jwt_authentication.models import IceUserProfile
from django.contrib.auth.models import User


@factory.django.mute_signals(post_save)
class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User

    iceuserprofile = factory.RelatedFactory(
        'tests.factories.authentication_factories.IceUserProfileFactory', 'user')
    username = factory.Sequence(lambda n: "user_%d" % n)
    password = factory.PostGenerationMethodCall('set_password',
                                                'client')


class IceUserProfileFactory(factory.DjangoModelFactory):
    class Meta:
        model = IceUserProfile

    user = factory.SubFactory(UserFactory, iceuserprofile=None)
    ice_token = factory.Sequence(lambda n: "ice_token_%d" % n)
