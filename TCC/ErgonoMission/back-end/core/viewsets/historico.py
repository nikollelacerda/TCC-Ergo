from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from ergonomission.helpers.permissions import IsOwner


from core.models import *
from core.serializers import *

class HistoricoViewSet(viewsets.ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer

    def get_permissions(self):
        if self.action in ['destroy', 'create']:
            permission_classes = [IsAuthenticated, IsOwner]
        if self.action in ['update', 'partial_update']:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    
