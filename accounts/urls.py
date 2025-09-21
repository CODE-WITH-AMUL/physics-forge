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
from .views import RegisterView, LoginView , LogoutView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name='logout')
]
