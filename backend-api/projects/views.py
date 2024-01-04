from rest_framework import generics, mixins

from api.mixins import (
    StaffEditorPermissionMixin,
    UserQuerySetMixin,
)

from .models import Project
from .serializers import ProjectSerializer

class ProjectListCreateAPIView(
    UserQuerySetMixin,
    StaffEditorPermissionMixin,
    generics.ListCreateAPIView,
):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

project_list_create_view = ProjectListCreateAPIView.as_view()


class ProjectDetailAPIView(
    UserQuerySetMixin, 
    StaffEditorPermissionMixin,
    generics.RetrieveAPIView
):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

project_detail_view = ProjectDetailAPIView.as_view()


class ProjectUpdateAPIView(
    UserQuerySetMixin,
    StaffEditorPermissionMixin,
    generics.UpdateAPIView
):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        instance = serializer.save()

project_update_view = ProjectUpdateAPIView.as_view()


class ProjectDestroyAPIView(
    UserQuerySetMixin,
    StaffEditorPermissionMixin,
    generics.DestroyAPIView
):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        super().perform_destroy(instance)

project_destroy_view = ProjectDestroyAPIView.as_view()


class ProjectMixinView(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
    ):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

project_mixin_view = ProjectMixinView.as_view()
