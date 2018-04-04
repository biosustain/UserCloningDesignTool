import factory
from tests.dependencies.create_gb import get_gb as gb
from parts_library.models import Part, PartHandler
from .primer_suggestion_factories import ProjectFactory


class PartHandlerFactory(factory.DjangoModelFactory):
    class Meta:
        model = PartHandler
        django_get_or_create = ("_project",)

    _project = factory.SubFactory(ProjectFactory)

    part1 = factory.RelatedFactory(
        'tests.factories.part_library_factories.PartFactory', '_handler')


class PartHandlerFactoryWithTwoParts(factory.DjangoModelFactory):
    class Meta:
        model = PartHandler
        django_get_or_create = ("_project",)

    # The project factory automatically creates a parthandler when 
    # instanciating, so none is passed to avoid creating two instances of the
    # parthandler. If 'none' was not passed two additional parts would created
    # and there would be 2+2=4 parts instead of 2
    _project = factory.SubFactory(ProjectFactory, _part_handler=None)

    part1 = factory.RelatedFactory(
        'tests.factories.part_library_factories.PartFactory', '_handler', order=0)
    part2 = factory.RelatedFactory(
        'tests.factories.part_library_factories.PartFactory', '_handler', order=1)


class PartFactory(factory.DjangoModelFactory):
    class Meta:
        model = Part

    ice_id = factory.Sequence(lambda n: n)
    ice_name = 'CRURPS14'
    order = factory.Sequence(lambda n: n)
    _handler = factory.SubFactory(PartHandlerFactory)
