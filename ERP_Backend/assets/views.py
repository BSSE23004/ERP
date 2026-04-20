from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import (
    AssetType,
    AssetSubType,
    AssetStatus,
    AssetLocation
)
from .serializers import (
    AssetTypeSerializer,
    AssetSubTypeSerializer,
    AssetStatusSerializer,
    AssetLocationSerializer
)


# ==================== ASSET TYPE ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def asset_type_list(request):
    """
    GET: Retrieve all asset types
    POST: Create a new asset type
    """
    if request.method == 'GET':
        try:
            asset_types = AssetType.objects.all()
            serializer = AssetTypeSerializer(asset_types, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch asset types: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = AssetTypeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create asset type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def asset_type_detail(request, pk):
    """
    GET: Retrieve a specific asset type
    PUT: Update a specific asset type
    DELETE: Delete a specific asset type
    """
    asset_type = get_object_or_404(AssetType, pk=pk)

    if request.method == 'GET':
        try:
            serializer = AssetTypeSerializer(asset_type)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch asset type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = AssetTypeSerializer(asset_type, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update asset type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            asset_type.delete()
            return Response(
                {'message': 'Asset type deleted successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete asset type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== ASSET SUB TYPE ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def asset_sub_type_list(request):
    """
    GET: Retrieve all asset sub types
    POST: Create a new asset sub type
    """
    if request.method == 'GET':
        try:
            asset_sub_types = AssetSubType.objects.all()
            serializer = AssetSubTypeSerializer(asset_sub_types, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch asset sub types: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = AssetSubTypeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create asset sub type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def asset_sub_type_detail(request, pk):
    """
    GET: Retrieve a specific asset sub type
    PUT: Update a specific asset sub type
    DELETE: Delete a specific asset sub type
    """
    asset_sub_type = get_object_or_404(AssetSubType, pk=pk)

    if request.method == 'GET':
        try:
            serializer = AssetSubTypeSerializer(asset_sub_type)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch asset sub type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = AssetSubTypeSerializer(asset_sub_type, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update asset sub type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            asset_sub_type.delete()
            return Response(
                {'message': 'Asset sub type deleted successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete asset sub type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== ASSET STATUS ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def asset_status_list(request):
    """
    GET: Retrieve all asset statuses
    POST: Create a new asset status
    """
    if request.method == 'GET':
        try:
            asset_statuses = AssetStatus.objects.all()
            serializer = AssetStatusSerializer(asset_statuses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch asset statuses: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = AssetStatusSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create asset status: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def asset_status_detail(request, pk):
    """
    GET: Retrieve a specific asset status
    PUT: Update a specific asset status
    DELETE: Delete a specific asset status
    """
    asset_status = get_object_or_404(AssetStatus, pk=pk)

    if request.method == 'GET':
        try:
            serializer = AssetStatusSerializer(asset_status)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch asset status: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = AssetStatusSerializer(asset_status, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update asset status: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            asset_status.delete()
            return Response(
                {'message': 'Asset status deleted successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete asset status: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== ASSET LOCATION ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def asset_location_list(request):
    """
    GET: Retrieve all asset locations
    POST: Create a new asset location
    """
    if request.method == 'GET':
        try:
            asset_locations = AssetLocation.objects.all()
            serializer = AssetLocationSerializer(asset_locations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch asset locations: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = AssetLocationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create asset location: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def asset_location_detail(request, pk):
    """
    GET: Retrieve a specific asset location
    PUT: Update a specific asset location
    DELETE: Delete a specific asset location
    """
    asset_location = get_object_or_404(AssetLocation, pk=pk)

    if request.method == 'GET':
        try:
            serializer = AssetLocationSerializer(asset_location)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch asset location: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = AssetLocationSerializer(asset_location, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update asset location: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            asset_location.delete()
            return Response(
                {'message': 'Asset location deleted successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete asset location: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
