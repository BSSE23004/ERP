# Accounts Module - Frontend Migration Guide

## ✅ COMPLETED Pages

The following pages have been fully migrated from localStorage to API:

1. **AccountGroup** - List page + Form ✅
2. **AccountNature** - List page + Form ✅
3. **VoucherType** - List page + Form ✅

## ⏳ REMAINING Pages to Update

### Pattern to Follow

Each page requires two files to be updated:

1. **List Page** (e.g., `src/pages/Accounts/ChartOfAccount.jsx`)
2. **Form Component** (e.g., `src/components/Accounts/ChartOfAccountForm.jsx`)

### Quick Template for List Pages

```jsx
import React, { useState } from "react";
import useAPI from "../../hooks/useAPI";
// ... other imports

export default function YourListPage() {
  const navigate = useNavigate();
  const { data: items, loading, error, delete: deleteItem } = useAPI("/api/accounts/your-endpoint/");
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filtered = items.filter(item =>
    // your filter logic
  );

  // Handle functions...
  const confirmDelete = async () => {
    try {
      await deleteItem(itemToDelete.id);
      setShowModal(false);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    // Your JSX with DataTable
  );
}
```

### Quick Template for Form Components

```jsx
import useAPI from "../../hooks/useAPI";

export default function YourForm({ id }) {
  const navigate = useNavigate();
  const { data: allItems, create, update } = useAPI("/api/accounts/your-endpoint/");

  const [formData, setFormData] = useState({...});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingItem = id && allItems ? allItems.find(item => item.id === parseInt(id)) : null;

  useEffect(() => {
    if (editingItem) {
      // Set form from editingItem
    }
  }, [id, allItems, editingItem]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await update(editingItem.id, formData);
      } else {
        await create(formData);
      }
      navigate("/your-list-page");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save");
    } finally {
      setIsSubmitting(false);
    }
  };
}
```

## Remaining Pages & API Endpoints

| Entity          | List Page | Form Component | API Endpoint                     |
| --------------- | --------- | -------------- | -------------------------------- |
| ChartOfAccount  | ⏳        | ⏳             | `/api/accounts/chartofaccount/`  |
| JournalVoucher  | ⏳        | ⏳             | `/api/accounts/journalvoucher/`  |
| LedgerEntry     | ⏳        | ⏳             | `/api/accounts/ledgerentry/`     |
| Narration       | ⏳        | ⏳             | `/api/accounts/narration/`       |
| CashBankVoucher | ⏳        | ⏳             | `/api/accounts/cashbankvoucher/` |
| Payment         | ⏳        | ⏳             | `/api/accounts/payment/`         |

### Special Notes

**ChartOfAccount:**

- Has relationships: `account_nature` (FK), `account_group` (FK), `parent_account` (self-referential)
- Backend returns: `account_nature_name`, `account_group_name`, `parent_account_name` for display
- Use these names in forms as dropdowns

**CashBankVoucher:**

- Has conditional fields: `bank` and `branch` fields only needed for Bank Payment/Receipt types
- Store `voucher_type` as one of: CASH_PAYMENT, CASH_RECEIPT, BANK_PAYMENT, BANK_RECEIPT

**Payment:**

- Has conditional fields based on `payment_category`: VENDOR, CUSTOMER, or EMPLOYEE
- Vendor: uses `vendor`, `grn`
- Customer: uses `customer`, `bill`
- Employee: uses `employee`
- All types share: `payment_type`, `payment_date`, `bank`, `branch`, `cheque_*`, `amount`, `payment_note`

**JournalVoucher, Narration, LedgerEntry:**

- Simpler structure, follow standard pattern

## Key Changes from localStorage to API

1. Replace `localStorage.getItem/setItem` with `useAPI` hook
2. Change navigation from using `.code` to `.id` (e.g., `${item.code}` → `${item.id}`)
3. Add loading/error state handling
4. Change from state-based deletion to API deletion with error handling
5. For forms: change from manual code generation to receiving from backend

## Testing

After updating each page:

1. Ensure Django backend is running (`python manage.py runserver`)
2. Test Create (Add New)
3. Test Read (List view with search/filter)
4. Test Update (Edit existing item)
5. Test Delete (confirm deletion works)

## Useful Commands

```bash
# Check backend is running
cd ERP_Backend && python manage.py runserver

# View data in admin panel
http://127.0.0.1:8000/admin/

# Test API endpoints directly
curl -H "Authorization: Bearer YOUR_TOKEN" http://127.0.0.1:8000/api/accounts/accountgroup/
```
