from django.shortcuts import render

# Create your views here.




from django.http import HttpResponse

from .models import Project


def index(request):
	projects = Project.objects.all()
	context = {'projects': projects}

	return render(request, 'draken/index.html', context)

	# kallar på render, byter ut pythonkod i html mot  html kod


