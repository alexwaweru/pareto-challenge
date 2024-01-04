from rest_framework.decorators import api_view
from rest_framework.response import Response

from projects.serializers import ProjectSerializer

@api_view(['POST', 'GET'])
def api_home(request, *args, **kwargs):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        return Response(serializer.data)
    return Response({"invalid": "not good data"}, status=400)