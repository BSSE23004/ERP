from django.contrib import admin
from .models import (
    AcademicProgram,
    AcademicSubject,
    AcademicClass,
    AcademicSection,
    ProgramType
)


@admin.register(AcademicProgram)
class AcademicProgramAdmin(admin.ModelAdmin):
    """Admin interface for Academic Programs"""
    list_display = ('code', 'name', 'program_type', 'program_fee', 'status', 'created_at')
    list_filter = ('status', 'created_at', 'program_type')
    search_fields = ('code', 'name', 'program_type')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('code', 'name')
        }),
        ('Program Details', {
            'fields': ('program_type', 'program_fee', 'description')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'


@admin.register(AcademicSubject)
class AcademicSubjectAdmin(admin.ModelAdmin):
    """Admin interface for Academic Subjects"""
    list_display = ('code', 'name', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('code', 'name')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('code', 'name', 'description')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'


@admin.register(AcademicClass)
class AcademicClassAdmin(admin.ModelAdmin):
    """Admin interface for Academic Classes"""
    list_display = ('code', 'name', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('code', 'name')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('code', 'name', 'description')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'


@admin.register(AcademicSection)
class AcademicSectionAdmin(admin.ModelAdmin):
    """Admin interface for Academic Sections"""
    list_display = ('code', 'name', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('code', 'name')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('code', 'name', 'description')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'


@admin.register(ProgramType)
class ProgramTypeAdmin(admin.ModelAdmin):
    """Admin interface for Program Types"""
    list_display = ('code', 'name', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('code', 'name')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('code', 'name', 'description')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
