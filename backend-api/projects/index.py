from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from .models import Project

@register(Project)
class ProjectIndex(AlgoliaIndex):
    fields = [
        'title',
        'description',
        'user',
        'public',
        'path',
        'endpoint',
    ]
    settings = {
        'searchableAttributes': ['title', 'description'],
        'attributesForFaceting': ['user', 'public']
    }
