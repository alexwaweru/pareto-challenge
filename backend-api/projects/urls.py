from django.urls import path

from . import views 

urlpatterns = [
    path('', views.project_list_create_view, name='project-list'),
    path('<int:pk>/update/', views.project_update_view, name='project-edit'),
    path('<int:pk>/delete/', views.project_destroy_view, name='project-delete'),
    path('<int:pk>/', views.project_detail_view, name='project-detail')
]
