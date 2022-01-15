from rest_framework import viewsets
from core.models import *
from core.serializers import *

class PomodoroViewSet(viewsets.ModelViewSet):
    queryset = Pomodoro.objects.all()
    serializer_class = PomodoroSerializer