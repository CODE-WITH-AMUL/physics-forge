from rest_framework.routers import DefaultRouter
from django.urls import path
from django.urls import include
from .views import RegisterView , LoginView


# router = DefaultRouter()
# router.register('login' , LoginView)
# router.register('register' , RegisterView)


# urlpatterns = [
#     path('' , include(router.urls)),
# ]


from django.urls import path
from .views import RegisterView, LoginView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
]
