from django.urls import include
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/' , include('api.urls')),
]



#-----------[ACCOUNT URL PATTERN]-----------------#

accounts_urlpatterns = [
    path('api/account/' , include('accounts.urls')),
]



#---------------[COMBINATION URL PATH]-------------#

urlpatterns += accounts_urlpatterns
