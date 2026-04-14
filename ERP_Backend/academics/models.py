from django.db import models


class AcademicProgram(models.Model):
    """Academic Program Model - Represents different academic programs offered"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique program code (e.g., AP-0000001)")
    name = models.CharField(max_length=200, help_text="Program name")
    description = models.TextField(blank=True, null=True, help_text="Program description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Program status"
    )
    program_type = models.CharField(max_length=100, blank=True, null=True, help_text="Type of program")
    program_fee = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Program fee amount")
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


class AcademicSubject(models.Model):
    """Academic Subject Model - Represents different subjects taught"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique subject code")
    name = models.CharField(max_length=200, help_text="Subject name")
    description = models.TextField(blank=True, null=True, help_text="Subject description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Subject status"
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


class AcademicClass(models.Model):
    """Academic Class Model - Represents classes within a program"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique class code")
    name = models.CharField(max_length=200, help_text="Class name")
    description = models.TextField(blank=True, null=True, help_text="Class description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Class status"
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


class AcademicSection(models.Model):
    """Academic Section Model - Represents sections of a class"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique section code")
    name = models.CharField(max_length=200, help_text="Section name")
    description = models.TextField(blank=True, null=True, help_text="Section description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Section status"
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


class ProgramType(models.Model):
    """Program Type Model - Represents different program types"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique program type code")
    name = models.CharField(max_length=200, help_text="Program type name")
    description = models.TextField(blank=True, null=True, help_text="Program type description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Program type status"
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
