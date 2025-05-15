from django.urls import path
from django.contrib.auth.decorators import login_required

from . import views

urlpatterns = [
    path("", login_required(views.index), name="Home"),
    path("<path:rest_of_path>", views.index, name="Home"),
]
