from ..models import Casette
from ..serializers import CasetteSerializer

from ..utils import user_permission

from rest_framework import viewsets


@user_permission
class CasetteApiDetail(viewsets.ModelViewSet):
    queryset = Casette.objects.all()
    serializer_class = CasetteSerializer
