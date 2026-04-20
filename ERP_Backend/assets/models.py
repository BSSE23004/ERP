from django.db import models


class AssetType(models.Model):
    """Asset Type Model - Represents different types of assets (e.g., Equipment, Furniture, Vehicles)"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique asset type code (e.g., AT-0001)")
    type_name = models.CharField(max_length=200, help_text="Asset type name")
    description = models.TextField(blank=True, null=True, help_text="Asset type description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Asset type status"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.code} - {self.type_name}"


class AssetSubType(models.Model):
    """Asset Sub Type Model - Represents sub-categories of asset types"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique asset sub type code (e.g., AST-0001)")
    asset_type = models.ForeignKey(
        AssetType,
        on_delete=models.PROTECT,
        related_name='subtypes',
        help_text="Parent asset type"
    )
    sub_type_name = models.CharField(max_length=200, help_text="Asset sub type name")
    description = models.TextField(blank=True, null=True, help_text="Asset sub type description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Asset sub type status"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.code} - {self.sub_type_name}"


class AssetStatus(models.Model):
    """Asset Status Model - Represents different statuses of assets (e.g., Active, Depreciated, Disposed)"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique asset status code (e.g., AS-0001)")
    name = models.CharField(max_length=200, help_text="Asset status name")
    description = models.TextField(blank=True, null=True, help_text="Asset status description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Status record status"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['status']),
        ]
        verbose_name_plural = 'Asset Statuses'

    def __str__(self):
        return f"{self.code} - {self.name}"


class AssetLocation(models.Model):
    """Asset Location Model - Represents different locations where assets are stored/used"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique asset location code (e.g., AL-0001)")
    name = models.CharField(max_length=200, help_text="Asset location name")
    description = models.TextField(blank=True, null=True, help_text="Asset location description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Location status"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.code} - {self.name}"
