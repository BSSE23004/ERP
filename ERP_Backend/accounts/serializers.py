from rest_framework import serializers
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


class AccountGroupSerializer(serializers.ModelSerializer):
    """Serializer for AccountGroup model"""
    class Meta:
        model = AccountGroup
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


class AccountNatureSerializer(serializers.ModelSerializer):
    """Serializer for AccountNature model"""
    class Meta:
        model = AccountNature
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


class ChartOfAccountSerializer(serializers.ModelSerializer):
    """Serializer for ChartOfAccount model"""
    account_nature_name = serializers.CharField(source='account_nature.name', read_only=True)
    account_group_name = serializers.CharField(source='account_group.name', read_only=True)
    parent_account_name = serializers.CharField(source='parent_account.name', read_only=True, allow_null=True)
    
    class Meta:
        model = ChartOfAccount
        fields = [
            'id',
            'code',
            'name',
            'parent_account',
            'parent_account_name',
            'account_nature',
            'account_nature_name',
            'account_group',
            'account_group_name',
            'opening_balance',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class VoucherTypeSerializer(serializers.ModelSerializer):
    """Serializer for VoucherType model"""
    class Meta:
        model = VoucherType
        fields = [
            'id',
            'code',
            'name',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class JournalVoucherSerializer(serializers.ModelSerializer):
    """Serializer for JournalVoucher model"""
    class Meta:
        model = JournalVoucher
        fields = [
            'id',
            'booking_date',
            'voucher_no',
            'document_no',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class LedgerEntrySerializer(serializers.ModelSerializer):
    """Serializer for LedgerEntry model"""
    class Meta:
        model = LedgerEntry
        fields = [
            'id',
            'document_no',
            'booking_date',
            'total_debit',
            'total_credit',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class NarrationSerializer(serializers.ModelSerializer):
    """Serializer for Narration model"""
    class Meta:
        model = Narration
        fields = [
            'id',
            'narration',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class CashBankVoucherSerializer(serializers.ModelSerializer):
    """Serializer for CashBankVoucher model"""
    class Meta:
        model = CashBankVoucher
        fields = [
            'id',
            'booking_date',
            'voucher_no',
            'document_no',
            'voucher_type',
            'total_amount',
            'bank',
            'branch',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PaymentSerializer(serializers.ModelSerializer):
    """Serializer for Payment model"""
    class Meta:
        model = Payment
        fields = [
            'id',
            'payment_category',
            'payment_type',
            'payment_date',
            'vendor',
            'grn',
            'customer',
            'bill',
            'employee',
            'bank',
            'branch',
            'cheque_no',
            'cheque_date',
            'cheque_cash_date',
            'amount',
            'payment_note',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
