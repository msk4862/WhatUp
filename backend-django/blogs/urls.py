from django.conf.urls import url
from django.urls import path

from .views import *

urlpatterns = [
    path('', BlogListApiView.as_view()),
    path('<int:pk>', BlogDetailApiView.as_view()),
]