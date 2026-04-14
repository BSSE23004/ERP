from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import (
    AcademicProgram,
    AcademicSubject,
    AcademicClass,
    AcademicSection,
    ProgramType
)
from .serializers import (
    AcademicProgramSerializer,
    AcademicSubjectSerializer,
    AcademicClassSerializer,
    AcademicSectionSerializer,
    ProgramTypeSerializer
)


# ==================== ACADEMIC PROGRAM ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def academic_program_list(request):
    """
    GET: Retrieve all academic programs
    POST: Create a new academic program
    """
    if request.method == 'GET':
        try:
            programs = AcademicProgram.objects.all()
            serializer = AcademicProgramSerializer(programs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch programs: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = AcademicProgramSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create program: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def academic_program_detail(request, pk):
    """
    GET: Retrieve a specific academic program
    PUT: Update a specific academic program
    DELETE: Delete a specific academic program
    """
    try:
        program = get_object_or_404(AcademicProgram, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Program not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = AcademicProgramSerializer(program)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch program: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = AcademicProgramSerializer(program, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update program: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            program.delete()
            return Response(
                {'message': 'Program deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete program: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== ACADEMIC SUBJECT ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def academic_subject_list(request):
    """
    GET: Retrieve all academic subjects
    POST: Create a new academic subject
    """
    if request.method == 'GET':
        try:
            subjects = AcademicSubject.objects.all()
            serializer = AcademicSubjectSerializer(subjects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch subjects: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = AcademicSubjectSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create subject: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def academic_subject_detail(request, pk):
    """
    GET: Retrieve a specific academic subject
    PUT: Update a specific academic subject
    DELETE: Delete a specific academic subject
    """
    try:
        subject = get_object_or_404(AcademicSubject, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Subject not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = AcademicSubjectSerializer(subject)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch subject: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = AcademicSubjectSerializer(subject, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update subject: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            subject.delete()
            return Response(
                {'message': 'Subject deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete subject: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== ACADEMIC CLASS ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def academic_class_list(request):
    """
    GET: Retrieve all academic classes
    POST: Create a new academic class
    """
    if request.method == 'GET':
        try:
            classes = AcademicClass.objects.all()
            serializer = AcademicClassSerializer(classes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch classes: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = AcademicClassSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create class: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def academic_class_detail(request, pk):
    """
    GET: Retrieve a specific academic class
    PUT: Update a specific academic class
    DELETE: Delete a specific academic class
    """
    try:
        academic_class = get_object_or_404(AcademicClass, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Class not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = AcademicClassSerializer(academic_class)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch class: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = AcademicClassSerializer(academic_class, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update class: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            academic_class.delete()
            return Response(
                {'message': 'Class deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete class: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== ACADEMIC SECTION ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def academic_section_list(request):
    """
    GET: Retrieve all academic sections
    POST: Create a new academic section
    """
    if request.method == 'GET':
        try:
            sections = AcademicSection.objects.all()
            serializer = AcademicSectionSerializer(sections, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch sections: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = AcademicSectionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create section: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def academic_section_detail(request, pk):
    """
    GET: Retrieve a specific academic section
    PUT: Update a specific academic section
    DELETE: Delete a specific academic section
    """
    try:
        section = get_object_or_404(AcademicSection, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Section not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = AcademicSectionSerializer(section)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch section: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = AcademicSectionSerializer(section, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update section: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            section.delete()
            return Response(
                {'message': 'Section deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete section: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== PROGRAM TYPE ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def program_type_list(request):
    """
    GET: Retrieve all program types
    POST: Create a new program type
    """
    if request.method == 'GET':
        try:
            types = ProgramType.objects.all()
            serializer = ProgramTypeSerializer(types, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch program types: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = ProgramTypeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create program type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def program_type_detail(request, pk):
    """
    GET: Retrieve a specific program type
    PUT: Update a specific program type
    DELETE: Delete a specific program type
    """
    try:
        program_type = get_object_or_404(ProgramType, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Program type not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = ProgramTypeSerializer(program_type)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch program type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = ProgramTypeSerializer(program_type, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update program type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            program_type.delete()
            return Response(
                {'message': 'Program type deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete program type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )