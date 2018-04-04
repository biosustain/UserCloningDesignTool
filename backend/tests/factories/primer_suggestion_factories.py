import factory
from primer_suggestion.models import AmuserCloning, Project, CombinatorialProject


class AmuserCloningFactory(factory.django.DjangoModelFactory):
    """docstring for CloningFactory"""
    class Meta:
        model = AmuserCloning


class AmuserCloningProjectFactory(factory.django.DjangoModelFactory):
    """docstring for CloningFactory"""
    class Meta:
        model = AmuserCloning

    project = factory.RelatedFactory(
        'tests.factories.primer_suggestion_factories.ProjectFactory', 'amusercloning')


class AmuserCloningCombinatorialFactory(factory.django.DjangoModelFactory):
    """docstring for CloningFactory"""
    class Meta:
        model = AmuserCloning

    combinatorial = factory.RelatedFactory(
        'tests.factories.primer_suggestion_factories.CombinatorialProjectFactory', 'amusercloning')


class CombinatorialProjectFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CombinatorialProject
        django_get_or_create = ('amusercloning',)

    name = factory.Sequence(lambda n: f'test_combinatorial_{n}')
    amusercloning = factory.SubFactory(AmuserCloningFactory)

    @factory.post_generation
    def user(self, create, extracted, **kwargs):
        if not create:
            # Simple build, do nothing.
            return

        if extracted:
            # A list of groups were passed in, use them
            self.user = extracted

    project1 = factory.RelatedFactory(
        'tests.factories.primer_suggestion_factories.ProjectFactory', 'combinatorial', user=user)
    project2 = factory.RelatedFactory(
        'tests.factories.primer_suggestion_factories.ProjectFactory', 'combinatorial', user=user)


class ProjectFactory(factory.django.DjangoModelFactory):
    """docstring for ProjectFactory"""
    class Meta:
        model = Project

    name = factory.Sequence(lambda n: f'test_project_{n}')

    @factory.post_generation
    def user(self, create, extracted, **kwargs):
        if not create:
            # Simple build, do nothing.
            return

        if extracted:
            # A list of groups were passed in, use them
            self.user = extracted

    amusercloning = factory.SubFactory(AmuserCloningFactory)
    _part_handler = factory.RelatedFactory(
        'tests.factories.part_library_factories.PartHandlerFactoryWithTwoParts', '_project')
