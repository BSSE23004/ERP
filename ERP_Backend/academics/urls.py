from django.contrib import admin
from django.urls import path, include
from academics import views

urlpatterns = [
    path('', views.getAcademics, name='academics'),
]
