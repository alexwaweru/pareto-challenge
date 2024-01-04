from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserProjectInlineSerializer(serializers.Serializer):
    url = serializers.HyperlinkedIdentityField(
            view_name='project-detail',
            lookup_field='pk',
            read_only=True
    )
    title = serializers.CharField(read_only=True)


class UserPublicSerializer(serializers.Serializer):
    username = serializers.CharField(read_only=True)
    id = serializers.IntegerField(read_only=True)
