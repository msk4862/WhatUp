from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListPosts.as_view()),
    path('<int:pk>/', views.DetailPost.as_view())
]