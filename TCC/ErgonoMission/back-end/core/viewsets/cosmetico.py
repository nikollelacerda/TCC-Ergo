from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser

from core.models import *
from core.serializers import *

class CosmeticoViewSet(viewsets.ModelViewSet):
    queryset = Cosmetico.objects.all()
    serializer_class = CosmeticoSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]
        if self.action in ['destroy', 'create', 'update', 'partial_update']:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
