from django.db import models


class AccountGroup(models.Model):
    """Account Group Model - Represents different account groups in accounting"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique account group code (e.g., AG-0001)")
    name = models.CharField(max_length=200, help_text="Account group name")
    description = models.TextField(blank=True, null=True, help_text="Account group description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Account group status"
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


class AccountNature(models.Model):
    """Account Nature Model - Represents different nature types of accounts"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique account nature code (e.g., AN-0001)")
    name = models.CharField(max_length=200, help_text="Account nature name")
    description = models.TextField(blank=True, null=True, help_text="Account nature description")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Account nature status"
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


class ChartOfAccount(models.Model):
    """Chart of Account Model - Represents accounts in the chart of accounts hierarchy"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique account code (e.g., COA-0001)")
    name = models.CharField(max_length=200, help_text="Account name")
    parent_account = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='children',
        help_text="Parent account for hierarchy"
    )
    account_nature = models.ForeignKey(
        AccountNature,
        on_delete=models.PROTECT,
        help_text="Type of account nature"
    )
    account_group = models.ForeignKey(
        AccountGroup,
        on_delete=models.PROTECT,
        help_text="Account group classification"
    )
    opening_balance = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0,
        help_text="Opening balance of the account"
    )
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Account status"
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


class VoucherType(models.Model):
    """Voucher Type Model - Represents different types of vouchers"""
    code = models.CharField(max_length=100, unique=True, help_text="Unique voucher type code (e.g., VT-0001)")
    name = models.CharField(max_length=200, help_text="Voucher type name")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Voucher type status"
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


class JournalVoucher(models.Model):
    """Journal Voucher Model - Represents journal entries in the system"""
    booking_date = models.DateField(help_text="Date of the journal voucher")
    voucher_no = models.CharField(max_length=100, unique=True, help_text="Unique voucher number")
    document_no = models.CharField(max_length=100, unique=True, help_text="Unique document number")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Voucher status"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['voucher_no']),
            models.Index(fields=['document_no']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.voucher_no} - {self.booking_date}"


class LedgerEntry(models.Model):
    """Ledger Entry Model - Represents individual ledger entries"""
    document_no = models.CharField(max_length=100, help_text="Reference document number")
    booking_date = models.DateField(help_text="Date of the ledger entry")
    total_debit = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0,
        help_text="Total debit amount"
    )
    total_credit = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0,
        help_text="Total credit amount"
    )
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Ledger entry status"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['document_no']),
            models.Index(fields=['booking_date']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.document_no} - {self.booking_date}"


class Narration(models.Model):
    """Narration Model - Represents descriptions/narrations for transactions"""
    narration = models.TextField(help_text="Narration text")
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Narration status"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.narration[:50]}... ({self.id})"


class CashBankVoucher(models.Model):
    """Cash/Bank Voucher Model - Represents cash and bank vouchers"""
    VOUCHER_TYPES = [
        ('CASH_PAYMENT', 'Cash Payment'),
        ('CASH_RECEIPT', 'Cash Receipt'),
        ('BANK_PAYMENT', 'Bank Payment'),
        ('BANK_RECEIPT', 'Bank Receipt'),
    ]
    
    booking_date = models.DateField(help_text="Date of the voucher")
    voucher_no = models.CharField(max_length=100, unique=True, help_text="Unique voucher number")
    document_no = models.CharField(max_length=100, unique=True, help_text="Unique document number")
    voucher_type = models.CharField(
        max_length=20,
        choices=VOUCHER_TYPES,
        help_text="Type of cash/bank voucher"
    )
    total_amount = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        help_text="Total transaction amount"
    )
    bank = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Bank name (for bank vouchers)"
    )
    branch = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Branch name (for bank vouchers)"
    )
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Voucher status"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['voucher_no']),
            models.Index(fields=['document_no']),
            models.Index(fields=['voucher_type']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.voucher_no} - {self.get_voucher_type_display()}"


class Payment(models.Model):
    """Payment Model - Represents payments to vendors, customers, or employees"""
    PAYMENT_TYPES = [
        ('CASH', 'Cash'),
        ('CREDIT', 'Credit'),
        ('RETURN', 'Return'),
        ('BANK_TRANSFER', 'Bank Transfer'),
        ('ONLINE_BANK_TRANSFER', 'Online Bank Transfer'),
        ('CHEQUE', 'Cheque'),
        ('ADVANCE_PAYMENT', 'Advance Payment'),
    ]
    
    PAYMENT_CATEGORIES = [
        ('VENDOR', 'Vendor Payment'),
        ('CUSTOMER', 'Customer Payment'),
        ('EMPLOYEE', 'Employee Payment'),
    ]
    
    payment_category = models.CharField(
        max_length=20,
        choices=PAYMENT_CATEGORIES,
        help_text="Category of payment"
    )
    payment_type = models.CharField(
        max_length=30,
        choices=PAYMENT_TYPES,
        help_text="Type of payment method"
    )
    payment_date = models.DateField(help_text="Date of payment")
    
    # Category-specific fields
    vendor = models.CharField(max_length=200, blank=True, null=True, help_text="Vendor name")
    grn = models.CharField(max_length=100, blank=True, null=True, help_text="GRN reference")
    customer = models.CharField(max_length=200, blank=True, null=True, help_text="Customer name")
    bill = models.CharField(max_length=100, blank=True, null=True, help_text="Bill reference")
    employee = models.CharField(max_length=200, blank=True, null=True, help_text="Employee name")
    
    # Payment details
    bank = models.CharField(max_length=100, blank=True, null=True, help_text="Bank name")
    branch = models.CharField(max_length=100, blank=True, null=True, help_text="Branch name")
    cheque_no = models.CharField(max_length=100, blank=True, null=True, help_text="Cheque number")
    cheque_date = models.DateField(blank=True, null=True, help_text="Cheque date")
    cheque_cash_date = models.DateField(blank=True, null=True, help_text="Cheque cashed date")
    
    amount = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        help_text="Payment amount"
    )
    payment_note = models.TextField(blank=True, null=True, help_text="Additional payment notes")
    
    status = models.CharField(
        max_length=50,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active',
        help_text="Payment status"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['payment_category']),
            models.Index(fields=['payment_type']),
            models.Index(fields=['payment_date']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        category_display = dict(self.PAYMENT_CATEGORIES).get(self.payment_category, '')
        if self.payment_category == 'VENDOR':
            return f"Vendor Payment - {self.vendor} ({self.payment_date})"
        elif self.payment_category == 'CUSTOMER':
            return f"Customer Payment - {self.customer} ({self.payment_date})"
        else:
            return f"Employee Payment - {self.employee} ({self.payment_date})"
