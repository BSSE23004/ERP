from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'academics'

urlpatterns = [
    # Academic Program endpoints
    path('programs/', views.academic_program_list, name='program-list'),
    path('programs/<int:pk>/', views.academic_program_detail, name='program-detail'),

    # Academic Subject endpoints
    path('subjects/', views.academic_subject_list, name='subject-list'),
    path('subjects/<int:pk>/', views.academic_subject_detail, name='subject-detail'),

    # Academic Class endpoints
    path('classes/', views.academic_class_list, name='class-list'),
    path('classes/<int:pk>/', views.academic_class_detail, name='class-detail'),

    # Academic Section endpoints
    path('sections/', views.academic_section_list, name='section-list'),
    path('sections/<int:pk>/', views.academic_section_detail, name='section-detail'),

    # Program Type endpoints
    path('program-types/', views.program_type_list, name='program-type-list'),
    path('program-types/<int:pk>/', views.program_type_detail, name='program-type-detail'),
]
