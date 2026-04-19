from django.test import TestCase
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


class AccountGroupTestCase(TestCase):
    def setUp(self):
        self.group = AccountGroup.objects.create(
            code="AG-0001",
            name="Test Account Group",
            description="Test description",
            status="Active"
        )

    def test_account_group_creation(self):
        self.assertTrue(isinstance(self.group, AccountGroup))
        self.assertEqual(str(self.group), "AG-0001 - Test Account Group")


class AccountNatureTestCase(TestCase):
    def setUp(self):
        self.nature = AccountNature.objects.create(
            code="AN-0001",
            name="Test Account Nature",
            description="Test description",
            status="Active"
        )

    def test_account_nature_creation(self):
        self.assertTrue(isinstance(self.nature, AccountNature))
        self.assertEqual(str(self.nature), "AN-0001 - Test Account Nature")
