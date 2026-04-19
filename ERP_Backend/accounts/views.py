from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
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
from .serializers import (
    AccountGroupSerializer,
    AccountNatureSerializer,
    ChartOfAccountSerializer,
    VoucherTypeSerializer,
    JournalVoucherSerializer,
    LedgerEntrySerializer,
    NarrationSerializer,
    CashBankVoucherSerializer,
    PaymentSerializer
)


# ==================== ACCOUNT GROUP ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def account_group_list(request):
    """
    GET: Retrieve all account groups
    POST: Create a new account group
    """
    if request.method == 'GET':
        try:
            groups = AccountGroup.objects.all()
            serializer = AccountGroupSerializer(groups, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch account groups: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = AccountGroupSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create account group: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def account_group_detail(request, pk):
    """
    GET: Retrieve a specific account group
    PUT: Update a specific account group
    DELETE: Delete a specific account group
    """
    try:
        group = get_object_or_404(AccountGroup, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Account group not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = AccountGroupSerializer(group)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch account group: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = AccountGroupSerializer(group, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update account group: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            group.delete()
            return Response(
                {'message': 'Account group deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete account group: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== ACCOUNT NATURE ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def account_nature_list(request):
    """
    GET: Retrieve all account natures
    POST: Create a new account nature
    """
    if request.method == 'GET':
        try:
            natures = AccountNature.objects.all()
            serializer = AccountNatureSerializer(natures, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch account natures: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = AccountNatureSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create account nature: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def account_nature_detail(request, pk):
    """
    GET: Retrieve a specific account nature
    PUT: Update a specific account nature
    DELETE: Delete a specific account nature
    """
    try:
        nature = get_object_or_404(AccountNature, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Account nature not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = AccountNatureSerializer(nature)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch account nature: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = AccountNatureSerializer(nature, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update account nature: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            nature.delete()
            return Response(
                {'message': 'Account nature deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete account nature: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== CHART OF ACCOUNT ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def chart_of_account_list(request):
    """
    GET: Retrieve all chart of accounts
    POST: Create a new chart of account
    """
    if request.method == 'GET':
        try:
            accounts = ChartOfAccount.objects.all()
            serializer = ChartOfAccountSerializer(accounts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch chart of accounts: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = ChartOfAccountSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create chart of account: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def chart_of_account_detail(request, pk):
    """
    GET: Retrieve a specific chart of account
    PUT: Update a specific chart of account
    DELETE: Delete a specific chart of account
    """
    try:
        account = get_object_or_404(ChartOfAccount, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Chart of account not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = ChartOfAccountSerializer(account)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch chart of account: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = ChartOfAccountSerializer(account, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update chart of account: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            account.delete()
            return Response(
                {'message': 'Chart of account deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete chart of account: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== VOUCHER TYPE ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def voucher_type_list(request):
    """
    GET: Retrieve all voucher types
    POST: Create a new voucher type
    """
    if request.method == 'GET':
        try:
            types = VoucherType.objects.all()
            serializer = VoucherTypeSerializer(types, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch voucher types: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = VoucherTypeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create voucher type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def voucher_type_detail(request, pk):
    """
    GET: Retrieve a specific voucher type
    PUT: Update a specific voucher type
    DELETE: Delete a specific voucher type
    """
    try:
        vtype = get_object_or_404(VoucherType, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Voucher type not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = VoucherTypeSerializer(vtype)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch voucher type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = VoucherTypeSerializer(vtype, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update voucher type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            vtype.delete()
            return Response(
                {'message': 'Voucher type deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete voucher type: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== JOURNAL VOUCHER ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def journal_voucher_list(request):
    """
    GET: Retrieve all journal vouchers
    POST: Create a new journal voucher
    """
    if request.method == 'GET':
        try:
            vouchers = JournalVoucher.objects.all()
            serializer = JournalVoucherSerializer(vouchers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch journal vouchers: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = JournalVoucherSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create journal voucher: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def journal_voucher_detail(request, pk):
    """
    GET: Retrieve a specific journal voucher
    PUT: Update a specific journal voucher
    DELETE: Delete a specific journal voucher
    """
    try:
        voucher = get_object_or_404(JournalVoucher, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Journal voucher not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = JournalVoucherSerializer(voucher)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch journal voucher: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = JournalVoucherSerializer(voucher, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update journal voucher: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            voucher.delete()
            return Response(
                {'message': 'Journal voucher deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete journal voucher: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== LEDGER ENTRY ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def ledger_entry_list(request):
    """
    GET: Retrieve all ledger entries
    POST: Create a new ledger entry
    """
    if request.method == 'GET':
        try:
            entries = LedgerEntry.objects.all()
            serializer = LedgerEntrySerializer(entries, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch ledger entries: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = LedgerEntrySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create ledger entry: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def ledger_entry_detail(request, pk):
    """
    GET: Retrieve a specific ledger entry
    PUT: Update a specific ledger entry
    DELETE: Delete a specific ledger entry
    """
    try:
        entry = get_object_or_404(LedgerEntry, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Ledger entry not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = LedgerEntrySerializer(entry)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch ledger entry: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = LedgerEntrySerializer(entry, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update ledger entry: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            entry.delete()
            return Response(
                {'message': 'Ledger entry deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete ledger entry: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== NARRATION ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def narration_list(request):
    """
    GET: Retrieve all narrations
    POST: Create a new narration
    """
    if request.method == 'GET':
        try:
            narrations = Narration.objects.all()
            serializer = NarrationSerializer(narrations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch narrations: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = NarrationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create narration: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def narration_detail(request, pk):
    """
    GET: Retrieve a specific narration
    PUT: Update a specific narration
    DELETE: Delete a specific narration
    """
    try:
        narration = get_object_or_404(Narration, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Narration not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = NarrationSerializer(narration)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch narration: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = NarrationSerializer(narration, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update narration: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            narration.delete()
            return Response(
                {'message': 'Narration deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete narration: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== CASH/BANK VOUCHER ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def cash_bank_voucher_list(request):
    """
    GET: Retrieve all cash/bank vouchers
    POST: Create a new cash/bank voucher
    """
    if request.method == 'GET':
        try:
            vouchers = CashBankVoucher.objects.all()
            serializer = CashBankVoucherSerializer(vouchers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch cash/bank vouchers: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = CashBankVoucherSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create cash/bank voucher: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def cash_bank_voucher_detail(request, pk):
    """
    GET: Retrieve a specific cash/bank voucher
    PUT: Update a specific cash/bank voucher
    DELETE: Delete a specific cash/bank voucher
    """
    try:
        voucher = get_object_or_404(CashBankVoucher, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Cash/bank voucher not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = CashBankVoucherSerializer(voucher)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch cash/bank voucher: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = CashBankVoucherSerializer(voucher, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update cash/bank voucher: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            voucher.delete()
            return Response(
                {'message': 'Cash/bank voucher deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete cash/bank voucher: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ==================== PAYMENT ENDPOINTS ====================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def payment_list(request):
    """
    GET: Retrieve all payments
    POST: Create a new payment
    """
    if request.method == 'GET':
        try:
            payments = Payment.objects.all()
            serializer = PaymentSerializer(payments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch payments: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            serializer = PaymentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to create payment: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def payment_detail(request, pk):
    """
    GET: Retrieve a specific payment
    PUT: Update a specific payment
    DELETE: Delete a specific payment
    """
    try:
        payment = get_object_or_404(Payment, pk=pk)
    except Exception as e:
        return Response(
            {'error': f'Payment not found: {str(e)}'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        try:
            serializer = PaymentSerializer(payment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Failed to fetch payment: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'PUT':
        try:
            serializer = PaymentSerializer(payment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Failed to update payment: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            payment.delete()
            return Response(
                {'message': 'Payment deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to delete payment: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
