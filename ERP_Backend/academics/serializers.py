from rest_framework import serializers
from .models import (
    AcademicProgram,
    AcademicSubject,
    AcademicClass,
    AcademicSection,
    ProgramType
)


class AcademicProgramSerializer(serializers.ModelSerializer):
    """Serializer for AcademicProgram model"""
    class Meta:
        model = AcademicProgram
        fields = [
            'id',
            'code',
            'name',
            'description',
            'status',
            'program_type',
            'program_fee',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AcademicSubjectSerializer(serializers.ModelSerializer):
    """Serializer for AcademicSubject model"""
    class Meta:
        model = AcademicSubject
        fields = [
            'id',
            'code',
            'name',
            'description',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AcademicClassSerializer(serializers.ModelSerializer):
    """Serializer for AcademicClass model"""
    class Meta:
        model = AcademicClass
        fields = [
            'id',
            'code',
            'name',
            'description',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AcademicSectionSerializer(serializers.ModelSerializer):
    """Serializer for AcademicSection model"""
    class Meta:
        model = AcademicSection
        fields = [
            'id',
            'code',
            'name',
            'description',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ProgramTypeSerializer(serializers.ModelSerializer):
    """Serializer for ProgramType model"""
    class Meta:
        model = ProgramType
        fields = [
            'id',
            'code',
            'name',
            'description',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
