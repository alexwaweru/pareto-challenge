from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Project

unique_project_title = UniqueValidator(queryset=Project.objects.all(), lookup='iexact')
