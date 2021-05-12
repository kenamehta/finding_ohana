import json

from django.core import serializers
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from authentication.models import User


def index(request):
    # User.objects.create(id=1, name='SRK', email='srk@gmi.com')
    # User.objects.create(id=2, name='Ranbeer', email='ranbeer@gmi.com')

    users = list(User.getAllUsers(request).values())

    return JsonResponse(users, safe=False)