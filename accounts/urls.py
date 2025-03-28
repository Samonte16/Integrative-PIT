from django.urls import path
from django.contrib.auth.views import LogoutView
from .views import register, user_login, home

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", user_login, name="login"),
    path("logout/", LogoutView.as_view(next_page="/accounts/login/"), name="logout"),
    path("", home, name="home"),
]
