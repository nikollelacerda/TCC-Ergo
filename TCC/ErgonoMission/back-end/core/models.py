from django.db import models
from django.contrib.auth.models import AbstractUser

from ergonomission.helpers import ALONGAMENTO_TIPO, POMODORO_STATUS

class Usuario(AbstractUser):
    uid = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    sobrenome = models.CharField(max_length=255)
    pontos = models.IntegerField(default=0)

    REQUIRED_FIELDS = ['uid', 'nome', 'sobrenome', 'pontos']

    def __str__(self):
        return f'{self.uid} - {self.nome.capitalize()} {self.sobrenome.capitalize()}'

class Pomodoro(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=255)
    status = models.CharField(max_length=1, choices=POMODORO_STATUS, default='I')
    duracao = models.IntegerField()

    def __str__(self):
        return f'{self.id}-{self.status[1]}-{self.titulo}'

class Alongamento(models.Model):
    tipo = models.CharField(max_length=1, choices=ALONGAMENTO_TIPO)
    descricao = models.TextField()
    imagem = models.ImageField(upload_to='imagem/alongamento')


    def __str__(self):
        return f'{self.id} - {self.descricao}'

class Cosmetico(models.Model):
    nome = models.CharField(max_length=255)
    imagem = models.ImageField(upload_to='imagem/cosmetico')

    def __str__(self):
        return f'{self.id} - {self.nome}'

class Personagem(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    apelido = models.CharField(max_length=255)
    cor_olhos = models.CharField(max_length=7) #EX: "#123456"
    cor_pele = models.CharField(max_length=7)
    cosmeticos = models.ForeignKey(Cosmetico, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f'{self.id} - {self.apelido}'

class Historico(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    descricao = models.TextField()
    data = models.DateTimeField()

    class Meta:
        ordering = ['-data']

    def __str__(self):
        return f'{self.id} - UID{self.usuario.uid}'