from rest_framework import serializers
from rest_framework.reverse import reverse

from api.serializers import UserPublicSerializer

from .models import Project
from . import validators


class ProjectInlineSerializer(serializers.Serializer):
    url = serializers.HyperlinkedIdentityField(
            view_name='project-detail',
            lookup_field='pk',
            read_only=True
    )
    title = serializers.CharField(read_only=True)


class ProjectSerializer(serializers.ModelSerializer):
    owner = UserPublicSerializer(source='user', read_only=True)
    title = serializers.CharField(validators=[validators.unique_project_title])
    description = serializers.CharField()

    class Meta:
        model = Project
        fields = [
            'owner',
            'pk',
            'title',
            'description',
            'requester',
            'public',
            'path',
            'endpoint',
        ]

    def get_my_user_data(self, obj):
        return {
            "username": obj.user.username
        }
    
    def get_edit_url(self, obj):
        request = self.context.get('request') # self.request
        if request is None:
            return None
        return reverse("project-edit", kwargs={"pk": obj.pk}, request=request) 
