from django.urls import path
from .views import (
    account_group_list, account_group_detail,
    account_nature_list, account_nature_detail,
    chart_of_account_list, chart_of_account_detail,
    voucher_type_list, voucher_type_detail,
    journal_voucher_list, journal_voucher_detail,
    ledger_entry_list, ledger_entry_detail,
    narration_list, narration_detail,
    cash_bank_voucher_list, cash_bank_voucher_detail,
    payment_list, payment_detail
)

app_name = 'accounts'

urlpatterns = [
    # Account Group URLs
    path('accountgroup/', account_group_list, name='accountgroup-list'),
    path('accountgroup/<int:pk>/', account_group_detail, name='accountgroup-detail'),

    # Account Nature URLs
    path('accountnature/', account_nature_list, name='accountnature-list'),
    path('accountnature/<int:pk>/', account_nature_detail, name='accountnature-detail'),

    # Chart of Account URLs
    path('chartofaccount/', chart_of_account_list, name='chartofaccount-list'),
    path('chartofaccount/<int:pk>/', chart_of_account_detail, name='chartofaccount-detail'),

    # Voucher Type URLs
    path('vouchertype/', voucher_type_list, name='vouchertype-list'),
    path('vouchertype/<int:pk>/', voucher_type_detail, name='vouchertype-detail'),

    # Journal Voucher URLs
    path('journalvoucher/', journal_voucher_list, name='journalvoucher-list'),
    path('journalvoucher/<int:pk>/', journal_voucher_detail, name='journalvoucher-detail'),

    # Ledger Entry URLs
    path('ledgerentry/', ledger_entry_list, name='ledgerentry-list'),
    path('ledgerentry/<int:pk>/', ledger_entry_detail, name='ledgerentry-detail'),

    # Narration URLs
    path('narration/', narration_list, name='narration-list'),
    path('narration/<int:pk>/', narration_detail, name='narration-detail'),

    # Cash/Bank Voucher URLs
    path('cashbankvoucher/', cash_bank_voucher_list, name='cashbankvoucher-list'),
    path('cashbankvoucher/<int:pk>/', cash_bank_voucher_detail, name='cashbankvoucher-detail'),

    # Payment URLs
    path('payment/', payment_list, name='payment-list'),
    path('payment/<int:pk>/', payment_detail, name='payment-detail'),
]
