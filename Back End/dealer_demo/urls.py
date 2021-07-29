"""dealer_demo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from dealer import views as app_views

urlpatterns = [
    path('cancer/all/', app_views.query_cancer),
    path('cancer/id', app_views.query_cancer_by_id),
    path('chess/all/', app_views.query_chess),
    path('chess/id', app_views.query_chess_by_id),
    path('admin/', admin.site.urls),
    path('amp', app_views.query_amp),
    path('amp_shapley', app_views.query_amp_shapley),
    path('shapley', app_views.query_compensation),
    path('write_survey', app_views.write_survey),
    path('model/all', app_views.query_all_model),
    path('model/exp', app_views.query_limited_model),
    path('model/release', app_views.release_model),
    path('iris/all', app_views.query_iris),
    path('delete_model', app_views.delete_all_model)
]
