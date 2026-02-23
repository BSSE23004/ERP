from rest_framework import serializers
from django.contrib.auth.models import User

# Serializer is used to convert User model instances to JSON and vice versa, for API responses and requests.
class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'full_name', 'is_active', 'is_staff']
        read_only_fields = ['id', 'is_active', 'is_staff']

    def get_full_name(self, obj):
        return obj.get_full_name() or obj.username
