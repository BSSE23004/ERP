from django.urls import path
from . import views

app_name = 'assets'

urlpatterns = [
    # Asset Type endpoints
    path('assettype/', views.asset_type_list, name='assettype-list'),
    path('assettype/<int:pk>/', views.asset_type_detail, name='assettype-detail'),

    # Asset Sub Type endpoints
    path('assetsubtype/', views.asset_sub_type_list, name='assetsubtype-list'),
    path('assetsubtype/<int:pk>/', views.asset_sub_type_detail, name='assetsubtype-detail'),

    # Asset Status endpoints
    path('assetstatus/', views.asset_status_list, name='assetstatus-list'),
    path('assetstatus/<int:pk>/', views.asset_status_detail, name='assetstatus-detail'),

    # Asset Location endpoints
    path('assetlocation/', views.asset_location_list, name='assetlocation-list'),
    path('assetlocation/<int:pk>/', views.asset_location_detail, name='assetlocation-detail'),
]
