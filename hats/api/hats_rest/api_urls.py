from django.urls import path
from .api_views import api_list_hat

urlpatterns = [
    path("hats/", api_list_hat, name="api_list_hat"),
]
