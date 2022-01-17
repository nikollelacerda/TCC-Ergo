from django.urls import path, include
from .views import *

urlpatterns = [
    path(f'historico/user/<int:uid>', fetchHistorico),
]