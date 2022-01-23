from rest_framework import permissions

#----------------------------------------#
### Constantes
#----------------------------------------#

COSMETICO_PADRAO = 1

#----------------------------------------#
### Mensagens do Sistema
#----------------------------------------#
MENSAGEM_USUARIO_DUPLICADO = 'Usuário já possui um personagem'
MENSAGEM_POMODORO_CONCLUIDO = '<p style="background:rgba(100,255,100,0.4)">Você concluiu a aventura <span style="color:white">?</span> e ganhou <span style="color:gold">?</span> pontos!'
MENSAGEM_POMODORO_ENCERRADO = '<p style="background:rgba(255,100,100,0.4)">Você desistiu da aventura <span style="color:white">?</span>, mas ganhou <span style="color:gold">?</span> pontos!'


#----------------------------------------#
### Listas
#----------------------------------------#
POMODORO_STATUS_INATIVO = ('I', 'Inativo')
POMODORO_STATUS_CONCLUIDO = ('C', 'Concluido')
POMODORO_STATUS_ENCERRADO = ('E', 'Encerrado')
POMODORO_STATUS = (
    POMODORO_STATUS_INATIVO,
    POMODORO_STATUS_CONCLUIDO,
    POMODORO_STATUS_ENCERRADO,
)

ALONG_TIPO_OLHOS = ('O', 'Olhos')
ALONG_TIPO_PESCOCO = ('P', 'Pescoço')
ALONG_TIPO_COSTAS = ('C', 'Costas')
ALONG_TIPO_MAO = ('M', 'Punho')
ALONGAMENTO_TIPO = (
    ALONG_TIPO_COSTAS,
    ALONG_TIPO_OLHOS,
    ALONG_TIPO_MAO,
    ALONG_TIPO_PESCOCO
)

#----------------------------------------#
### Funções
#----------------------------------------#

def calcular_pontos(p):
    multiplier = 0
    if(p.status == POMODORO_STATUS[1][0]):
        multiplier = 1.5
    if(p.status == POMODORO_STATUS[2][0]):
        multiplier = 1
    
    pontos = p.duracao * multiplier
    return pontos

def parse_mensagem(m, *args):
    for arg in args:
        m = m.replace("?", str(arg), 1)
    return m

#----------------------------------------#
### Classes
#----------------------------------------#

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user