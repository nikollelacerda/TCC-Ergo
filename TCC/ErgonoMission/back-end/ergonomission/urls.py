from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken import views
from core.views import * 

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'pomodoros', PomodoroViewSet)
router.register(r'alongamentos', AlongamentoViewSet)
router.register(r'personagens', PersonagemViewSet)
router.register(r'cosmeticos', CosmeticoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='NRF')),
    path('admin/', admin.site.urls),
    path('auth/', views.obtain_auth_token),
]