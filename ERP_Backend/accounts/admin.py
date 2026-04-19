from django.contrib import admin
from .models import (
    AccountGroup,
    AccountNature,
    ChartOfAccount,
    VoucherType,
    JournalVoucher,
    LedgerEntry,
    Narration,
    CashBankVoucher,
    Payment
)


@admin.register(AccountGroup)
class AccountGroupAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'status', 'created_at', 'updated_at']
    list_filter = ['status', 'created_at']
    search_fields = ['code', 'name', 'description']
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
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'


@admin.register(AccountNature)
class AccountNatureAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'status', 'created_at', 'updated_at']
    list_filter = ['status', 'created_at']
    search_fields = ['code', 'name', 'description']
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
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'


@admin.register(ChartOfAccount)
class ChartOfAccountAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'account_nature', 'account_group', 'status', 'created_at']
    list_filter = ['status', 'account_nature', 'account_group', 'created_at']
    search_fields = ['code', 'name']
    fieldsets = (
        ('Account Information', {
            'fields': ('code', 'name')
        }),
        ('Account Classification', {
            'fields': ('account_nature', 'account_group', 'parent_account')
        }),
        ('Financial Details', {
            'fields': ('opening_balance',)
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'


@admin.register(VoucherType)
class VoucherTypeAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'status', 'created_at', 'updated_at']
    list_filter = ['status', 'created_at']
    search_fields = ['code', 'name']
    fieldsets = (
        ('Voucher Type Information', {
            'fields': ('code', 'name')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'


@admin.register(JournalVoucher)
class JournalVoucherAdmin(admin.ModelAdmin):
    list_display = ['voucher_no', 'booking_date', 'document_no', 'status', 'created_at']
    list_filter = ['status', 'booking_date', 'created_at']
    search_fields = ['voucher_no', 'document_no']
    fieldsets = (
        ('Voucher Information', {
            'fields': ('voucher_no', 'document_no')
        }),
        ('Date Information', {
            'fields': ('booking_date',)
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'booking_date'


@admin.register(LedgerEntry)
class LedgerEntryAdmin(admin.ModelAdmin):
    list_display = ['document_no', 'booking_date', 'total_debit', 'total_credit', 'status', 'created_at']
    list_filter = ['status', 'booking_date', 'created_at']
    search_fields = ['document_no']
    fieldsets = (
        ('Entry Information', {
            'fields': ('document_no',)
        }),
        ('Date Information', {
            'fields': ('booking_date',)
        }),
        ('Financial Details', {
            'fields': ('total_debit', 'total_credit')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'booking_date'


@admin.register(Narration)
class NarrationAdmin(admin.ModelAdmin):
    list_display = ['id', 'narration', 'status', 'created_at', 'updated_at']
    list_filter = ['status', 'created_at']
    search_fields = ['narration']
    fieldsets = (
        ('Narration Information', {
            'fields': ('narration',)
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('id', 'created_at', 'updated_at')
    date_hierarchy = 'created_at'


@admin.register(CashBankVoucher)
class CashBankVoucherAdmin(admin.ModelAdmin):
    list_display = ['voucher_no', 'booking_date', 'voucher_type', 'total_amount', 'status', 'created_at']
    list_filter = ['status', 'voucher_type', 'booking_date', 'created_at']
    search_fields = ['voucher_no', 'document_no']
    fieldsets = (
        ('Voucher Information', {
            'fields': ('voucher_no', 'document_no', 'voucher_type')
        }),
        ('Date Information', {
            'fields': ('booking_date',)
        }),
        ('Financial Details', {
            'fields': ('total_amount',)
        }),
        ('Bank Information', {
            'fields': ('bank', 'branch'),
            'description': 'Fill if voucher type is Bank Payment/Receipt'
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'booking_date'


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['payment_category', 'payment_type', 'payment_date', 'amount', 'status', 'created_at']
    list_filter = ['status', 'payment_category', 'payment_type', 'payment_date', 'created_at']
    search_fields = ['vendor', 'customer', 'employee', 'cheque_no']
    fieldsets = (
        ('Payment Category', {
            'fields': ('payment_category',)
        }),
        ('Payment Information', {
            'fields': ('payment_type', 'payment_date', 'amount')
        }),
        ('Vendor Information', {
            'fields': ('vendor', 'grn'),
            'classes': ('collapse',),
            'description': 'Used for vendor payments'
        }),
        ('Customer Information', {
            'fields': ('customer', 'bill'),
            'classes': ('collapse',),
            'description': 'Used for customer payments'
        }),
        ('Employee Information', {
            'fields': ('employee',),
            'classes': ('collapse',),
            'description': 'Used for employee payments'
        }),
        ('Bank Details', {
            'fields': ('bank', 'branch'),
            'classes': ('collapse',),
        }),
        ('Cheque Details', {
            'fields': ('cheque_no', 'cheque_date', 'cheque_cash_date'),
            'classes': ('collapse',),
            'description': 'Fill if payment type is Cheque'
        }),
        ('Additional Information', {
            'fields': ('payment_note',),
            'classes': ('collapse',),
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'payment_date'
