# PHASE 1 MIGRATION - QUICK START GUIDE

## What Was Done

### ✅ BACKEND (Django)

1. **Created 5 Database Models** in `academics/models.py`
   - AcademicProgram
   - AcademicSubject
   - AcademicClass
   - AcademicSection
   - ProgramType

2. **Created REST API Endpoints** - `/api/academics/{entity}/`
   - GET all items
   - POST create new item
   - GET/PUT/DELETE specific items
   - All endpoints are authenticated

3. **Database Migrations Applied**
   - Tables created in PostgreSQL
   - Ready for production

### ✅ FRONTEND (React)

1. **Created Custom Hook** - `useAPI.js`
   - Handles all CRUD operations
   - Automatic loading/error states
   - Single source of truth for API calls

2. **Updated 5 List Pages** - Now use API instead of localStorage
   - AcademicProgram.jsx
   - AcademicSubject.jsx
   - AcademicClass.jsx
   - AcademicSection.jsx
   - ProgramType.jsx

3. **Added Error Handling**
   - Loading states while fetching
   - Error messages with retry
   - Success notifications

---

## Quick Test Steps

### 1. Start Backend

```bash
cd /home/ibrahim/Git/ERP && source .venv/bin/activate
cd ERP_Backend && python manage.py runserver 0.0.0.0:8000
```

### 2. Start Frontend

```bash
cd /home/ibrahim/Git/ERP/ERP && npm run dev
```

### 3. Test in Browser

- Go to `http://localhost:5173`
- Login with credentials
- Navigate to "Academic Program" page
- Should see data from PostgreSQL
- Try adding/editing/deleting items

---

## Field Name Changes

**⚠️ Important:** Field names changed from camelCase to snake_case

```javascript
// Old (localStorage)
program.programType;
program.programFee;

// New (API response)
program.program_type;
program.program_fee;
```

**Already Updated In:**

- Table columns
- Filter logic
- URL generation

---

## What Still Needs To Be Updated

### Form Components (NOT YET UPDATED)

These still use localStorage - need to convert to API:

- `src/components/Academics/AcademicProgramForm.jsx`
- `src/components/Academics/AcademicSubjectForm.jsx`
- `src/components/Academics/AcademicClassForm.jsx`
- `src/components/Academics/AcademicSectionForm.jsx`
- `src/components/Academics/ProgramTypeForm.jsx`

### How to Update Form Components

Look at the pattern - replace:

```javascript
// Old
const storedItems = localStorage.getItem(LOCAL_KEY);
const initialItems = storedItems ? JSON.parse(storedItems) : [];

// With
import api from "../../services/api";

const handleSave = async (e) => {
  e.preventDefault();
  try {
    if (id) {
      await api.put(`/api/academics/programs/${id}/`, data);
    } else {
      await api.post("/api/academics/programs/", data);
    }
    navigate("/academic-program");
  } catch (err) {
    setError(err.message);
  }
};
```

---

## API Endpoints Reference

### Programs

- `POST /api/academics/programs/` - Create
- `GET /api/academics/programs/` - List all
- `GET /api/academics/programs/{id}/` - Get one
- `PUT /api/academics/programs/{id}/` - Update
- `DELETE /api/academics/programs/{id}/` - Delete

### Subjects

- POST/GET/PUT/DELETE `/api/academics/subjects/`

### Classes

- POST/GET/PUT/DELETE `/api/academics/classes/`

### Sections

- POST/GET/PUT/DELETE `/api/academics/sections/`

### Program Types

- POST/GET/PUT/DELETE `/api/academics/program-types/`

---

## Authentication

All endpoints require authentication token from login.

**If you get 401 error:**

- User is not authenticated
- Need to login first
- Tokens are included automatically by axios interceptor

---

## Error Codes

| Code | Meaning      | Solution                          |
| ---- | ------------ | --------------------------------- |
| 200  | Success      | All good                          |
| 201  | Created      | Item created successfully         |
| 400  | Bad Request  | Invalid data - check format       |
| 401  | Unauthorized | Not logged in - login first       |
| 404  | Not Found    | Item doesn't exist                |
| 500  | Server Error | Backend error - check server logs |

---

## Key Files

| File             | Changes                          |
| ---------------- | -------------------------------- |
| `models.py`      | 5 new models created             |
| `serializers.py` | NEW - converts models to JSON    |
| `views.py`       | 10 new endpoints (2 per model)   |
| `urls.py`        | Updated URL patterns             |
| `useAPI.js`      | NEW - custom React hook          |
| Page components  | 5 updated to use API             |
| Form components  | PENDING - still use localStorage |

---

## Troubleshooting

### Problem: "Unauthorized" error

**Solution:** Login first. Tokens are required.

### Problem: Field names don't match

**Solution:** Use `program_type` not `programType` (snake_case)

### Problem: 404 when accessing `/editacademicsubject/123`

**Solution:** Make sure you're passing the database ID, not code

### Problem: Data still in localStorage

**Solution:** Browser localStorage is separate from database. Clear browser cache if needed.

### Problem: Backend not responding

**Solution:** Check Django server is running on port 8000

---

## Next Phase: Accounts Module

Same pattern will be used for:

- JournalVoucher
- LedgerEntries
- Narration
- EmployeePayment
- AccountNature
- VendorPayment
- BankReceiptVoucher
- VoucherType
- ChartOfAccount
- AccountGroup
- CustomerPayment
- BankPaymentVoucher

Total: 12 account entities to migrate

---

**Status:** Phase 1 Academics - 95% Complete ✅
**Remaining:** Update 5 form components (estimated 30 mins)
