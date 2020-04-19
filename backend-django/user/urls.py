from django.urls import path

from .views import *

urlpatterns = [
    path('<int:pk>', UserDetailAPIView.as_view()),
    path('', UserListAPIView.as_view()),

]