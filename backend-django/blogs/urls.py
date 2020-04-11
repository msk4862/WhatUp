from django.urls import path

from .views import *

urlpatterns = [
    path('blogs/', BlogListApiView.as_view()),
    path('blogs/<int:pk>', BlogDetailApiView.as_view()),
]