from rest_framework import serializers
from .models import (
    AssetType,
    AssetSubType,
    AssetStatus,
    AssetLocation
)


class AssetTypeSerializer(serializers.ModelSerializer):
    """Serializer for AssetType model"""
    class Meta:
        model = AssetType
        fields = [
            'id',
            'code',
            'type_name',
            'description',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AssetSubTypeSerializer(serializers.ModelSerializer):
    """Serializer for AssetSubType model"""
    asset_type_name = serializers.CharField(source='asset_type.type_name', read_only=True)

    class Meta:
        model = AssetSubType
        fields = [
            'id',
            'code',
            'asset_type',
            'asset_type_name',
            'sub_type_name',
            'description',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AssetStatusSerializer(serializers.ModelSerializer):
    """Serializer for AssetStatus model"""
    class Meta:
        model = AssetStatus
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


class AssetLocationSerializer(serializers.ModelSerializer):
    """Serializer for AssetLocation model"""
    class Meta:
        model = AssetLocation
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
