from django.contrib import admin
from django.urls import path, include
from home import views

urlpatterns = [
    path('/home', views.getHomeCards, name='homeCards'),
    path('', views.loginUser, name='login'),
    path('signup/', views.signup, name='signup'),
    path('index/', views.index, name='index'),
    path('about/', views.about, name='about'), 
    path('contact/', views.contact, name='contact'),
    path('logout/', views.logoutUser, name='logout'),
    path('pricings/', views.pricings, name='pricings'),
]
