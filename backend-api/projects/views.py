from rest_framework import generics, authentication

from api.mixins import(
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
    permission_classes = []

    def perform_destroy(self, instance):
        super().perform_destroy(instance)

project_destroy_view = ProjectDestroyAPIView.as_view()
