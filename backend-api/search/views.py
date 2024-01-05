from rest_framework import generics
from rest_framework.response import Response

from projects.models import Project
from projects.serializers import ProjectSerializer

from . import client

class SearchListView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        user = None
        if request.user.is_authenticated:
            user = request.user.id
        query = request.GET.get('q')
        public = bool(request.GET.get('public'))
        if not query:
            return Response('', status=400)
        results = client.perform_search(query, user=user, public=public)
        return Response(results)
