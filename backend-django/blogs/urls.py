from django.urls import path

from . import views

urlpatterns = [
    path('blogs/', views.BlogListAPiView.as_view()),
    path('blogs/<int:pk>', views.BlogDetailSerializer.as_view()),
]