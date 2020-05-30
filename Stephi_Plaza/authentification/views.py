import django
from django.shortcuts import render
from django.views import View
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from validate_email import validate_email
from django.forms import forms


# Create your views here.


class UsernameValidationView(View):
    username = None
    test = None

    def post(self, request):
        data = json.loads(request.body)
        self.username = data['username']

        if not str(self.username).isalnum():
            return JsonResponse(
                {'username_error': 'le nom d\'utilisateurs ne doit pas contenir de caractères spéciaux '}, status=400)

        if User.objects.filter(username=self.username).exists():
            return JsonResponse({'username_error': 'désolez, ce nom existe déjà, veuillez en choisir un autre'},
                                status=409)
        test = JsonResponse({'username_valid': True})
        return test


class EmailValidationView(View):
    test = None

    def post(self, request):
        data = json.loads(request.body)
        email = data['email']
        print(email)

        if validate_email(email):
            return JsonResponse({'email_error': 'Cette email n\'est pas dans le bon format'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'email_error': 'Cette email existe déjà'}, status=409)
        test = JsonResponse({'email_valid': True})
        return test


class RegistrationView(View):
    us = UsernameValidationView
    em = EmailValidationView

    if not us.test == False and not em.test == False:
        forms.save()

    def get(self, request):
        return render(request, 'authentification/register.html')



class LoginView(View):
    def get(self, request):
        return render(request, 'authentification/login.html'),
