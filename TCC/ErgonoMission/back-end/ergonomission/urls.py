from .settings import BASE_ROUTE
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
#from rest_framework.authtoken import views
from core.views import * 

router = routers.DefaultRouter()
router.register(r'pomodoros', PomodoroViewSet)
router.register(r'alongamentos', AlongamentoViewSet)
router.register(r'personagens', PersonagemViewSet)
router.register(r'cosmeticos', CosmeticoViewSet)

urlpatterns = [
    path(BASE_ROUTE, include(router.urls)),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path(f'{BASE_ROUTE}auth/', include('authapp.urls')),
    path('admin/', admin.site.urls),
]