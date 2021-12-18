from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core.views import * 

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='NRF')),
    path('admin/', admin.site.urls),
]
