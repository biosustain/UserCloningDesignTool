"""user_primer URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
import django.contrib.auth.views
from django.views.generic import RedirectView
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token
from jwt_authentication.views import SignalObtainJSONWebToken
from rest_framework import routers
from primer_suggestion.views import ProjectApiList, ProjectApiDetail, CombinatorialProjectApiList, CombinatorialProjectApiDetail, CasetteApiDetail
from parts_library.views import PartApiDetail, PartApiList, PartHandlerViewSet, IcePartApiList

router = routers.DefaultRouter()
router.register(r'parts', PartApiDetail)
router.register(r'parts', PartApiList)
router.register(r'parthandler', PartHandlerViewSet)
router.register(r'projects', ProjectApiList)
router.register(r'projects', ProjectApiDetail)
router.register(r'combinatorial', CombinatorialProjectApiList)
router.register(r'combinatorial', CombinatorialProjectApiDetail)
router.register(r'cassete', CasetteApiDetail)

urlpatterns = [
    url(r'^rest/admin/', admin.site.urls),
    url(r'^rest/accounts/login/$', django.contrib.auth.views.login, name='login'),
    url(r'^rest/api/ice-parts[/]?$', IcePartApiList.as_view(), name='parts'),
    url(r'^rest/api/', include(router.urls)),
    url(r'^rest/api/token-auth/', SignalObtainJSONWebToken.as_view()),
    url(r'^rest/api/token-refresh/', refresh_jwt_token),
    url(r'^rest/api/token-verify/', verify_jwt_token),
    url(r'^rest/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^.*$', RedirectView.as_view(url='/index.html'), name='index'),
]
