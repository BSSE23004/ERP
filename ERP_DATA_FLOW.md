# Academic Module - Complete Data Flow Documentation

## PostgreSQL Database ↔ React Frontend Integration

---

## Table of Contents

1. [Overview](#overview)
2. [Data Flow Architecture](#data-flow-architecture)
3. [Complete Request-Response Flow](#complete-request-response-flow)
4. [File Structure and References](#file-structure-and-references)
5. [API Endpoints](#api-endpoints)
6. [Authentication & CSRF](#authentication--csrf)
7. [Testing & Error Handling](#testing--error-handling)
8. [Database Schema](#database-schema)
9. [Form Components Reference](#form-components-reference)

---

## Overview

This document provides a comprehensive overview of the data flow for the Academic module in the ERP system. The system has been migrated from localStorage to PostgreSQL backend using Django REST Framework with React as the frontend.

### Key Components

- **Backend**: Django REST Framework API
- **Database**: PostgreSQL
- **Frontend**: React with Axios HTTP Client
- **Custom Hook**: useAPI for CRUD operations
- **Authentication**: Session-based with CSRF protection

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │  Form Components │  │   List Pages     │                 │
│  │  (*.form.jsx)    │  │  (*.jsx)         │                 │
│  └────────┬─────────┘  └────────┬─────────┘                 │
│           │                     │                            │
│           └──────────┬──────────┘                            │
│                      │                                        │
│           ┌──────────▼────────────┐                          │
│           │  Custom Hook useAPI   │                          │
│           │  - create()           │                          │
│           │  - update()           │                          │
│           │  - delete_()          │                          │
│           │  - fetchData()        │                          │
│           └──────────┬────────────┘                          │
│                      │                                        │
│           ┌──────────▼────────────┐                          │
│           │   Axios Instance      │                          │
│           │  - CSRF Interceptor   │                          │
│           │  - Auth Headers       │                          │
│           └──────────┬────────────┘                          │
└─────────────────────┼───────────────────────────────────────┘
                      │ HTTP Request/Response
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 DJANGO BACKEND                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  academics/views.py - API Endpoints                  │   │
│  │  - academic_program_list/detail                      │   │
│  │  - academic_subject_list/detail                      │   │
│  │  - academic_class_list/detail                        │   │
│  │  - academic_section_list/detail                      │   │
│  │  - program_type_list/detail                          │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                       │
│  ┌────────────────────▼─────────────────────────────────┐   │
│  │  academics/serializers.py - Data Validation           │   │
│  │  - AcademicProgramSerializer                          │   │
│  │  - AcademicSubjectSerializer                          │   │
│  │  - AcademicClassSerializer                            │   │
│  │  - AcademicSectionSerializer                          │   │
│  │  - ProgramTypeSerializer                              │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                       │
│  ┌────────────────────▼─────────────────────────────────┐   │
│  │  academics/models.py - ORM Models                     │   │
│  │  - AcademicProgram                                    │   │
│  │  - AcademicSubject                                    │   │
│  │  - AcademicClass                                      │   │
│  │  - AcademicSection                                    │   │
│  │  - ProgramType                                        │   │
│  └────────────────────┬─────────────────────────────────┘   │
└─────────────────────┼────────────────────────────────────────┘
                      │ SQL Queries
                      │
┌─────────────────────▼────────────────────────────────────────┐
│             POSTGRESQL DATABASE                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ academics_academicprogram                           │   │
│  │ academics_academicsubject                           │   │
│  │ academics_academicclass                             │   │
│  │ academics_academicsection                           │   │
│  │ academics_programtype                               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Complete Request-Response Flow

### Flow 1: CREATE New Academic Subject

#### Step 1: User Fills Form

**File**: [ERP/src/components/Academics/AcademicSubjectForm.jsx](ERP/src/components/Academics/AcademicSubjectForm.jsx)

```jsx
// State managed by form component (lines 10-20)
const [code, setCode] = useState("");
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [status, setStatus] = useState(true);
```

#### Step 2: Form Submission

**File**: [ERP/src/components/Academics/AcademicSubjectForm.jsx](ERP/src/components/Academics/AcademicSubjectForm.jsx) - `handleSave()` function (lines 36-69)

```jsx
const handleSave = async (e) => {
  e.preventDefault();
  setError("");

  if (!name.trim()) {
    setError("Name is required");
    return;
  }

  const formData = {
    code: code.trim(),
    name: name.trim(),
    description: description.trim(),
    status: status ? "Active" : "Inactive",
  };

  try {
    setIsSubmitting(true);
    await api.post("/api/academics/subjects/", formData);
    navigate("/academic-subject");
  } catch (err) {
    const errorMsg = err.response?.data?.error || err.message;
    setError(errorMsg);
  } finally {
    setIsSubmitting(false);
  }
};
```

#### Step 3: HTTP POST Request

**File**: [ERP/src/services/api.js](ERP/src/services/api.js) - Axios Interceptor (lines 15-35)

```javascript
// CSRF Token Interceptor adds security token
api.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrftoken");
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

// Request sent:
POST /api/academics/subjects/
Headers: {
  "Content-Type": "application/json",
  "X-CSRFToken": "xxxxxxxx",
  "Cookie": "sessionid=xxxxxxxx; csrftoken=xxxxxxxx"
}
Body: {
  "code": "AS-0000001",
  "name": "Mathematics",
  "description": "Basic Mathematics",
  "status": "Active"
}
```

#### Step 4: Django Backend Processing

**File**: [ERP_Backend/academics/views.py](ERP_Backend/academics/views.py) - `academic_subject_list()` (lines 70-92)

```python
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def academic_subject_list(request):
    if request.method == 'POST':
        serializer = AcademicSubjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

#### Step 5: Data Validation

**File**: [ERP_Backend/academics/serializers.py](ERP_Backend/academics/serializers.py) - `AcademicSubjectSerializer`

```python
class AcademicSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicSubject
        fields = ['id', 'code', 'name', 'description', 'status', 'created_at', 'updated_at']
        # Validates:
        # - code: unique, max_length=100
        # - name: required, max_length=200
        # - status: must be 'Active' or 'Inactive'
```

#### Step 6: Database Save

**File**: [ERP_Backend/academics/models.py](ERP_Backend/academics/models.py) - `AcademicSubject` model (lines 33-53)

```python
class AcademicSubject(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=[...], default='Active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # SQL Generated:
    # INSERT INTO academics_academicsubject
    # (code, name, description, status, created_at, updated_at)
    # VALUES ('AS-0000001', 'Mathematics', 'Basic Mathematics', 'Active', NOW(), NOW())
```

#### Step 7: Response Back to Frontend

```json
{
  "id": 1,
  "code": "AS-0000001",
  "name": "Mathematics",
  "description": "Basic Mathematics",
  "status": "Active",
  "created_at": "2024-04-18T10:30:00Z",
  "updated_at": "2024-04-18T10:30:00Z"
}
```

#### Step 8: Frontend Update

**File**: [ERP/src/components/Academics/AcademicSubjectForm.jsx](ERP/src/components/Academics/AcademicSubjectForm.jsx) (line 68)

```jsx
// Success - navigate back to list
navigate("/academic-subject");
```

**File**: [ERP/src/pages/Academics/AcademicSubject.jsx](ERP/src/pages/Academics/AcademicSubject.jsx) (line 10)

```jsx
// useAPI hook refetches data automatically
const { data: subjects, loading, error } = useAPI("/api/academics/subjects/");
// New subject appears in the list!
```

---

### Flow 2: UPDATE Existing Academic Subject

#### Step 1: Load Form with Existing Data

**File**: [ERP/src/components/Academics/AcademicSubjectForm.jsx](ERP/src/components/Academics/AcademicSubjectForm.jsx) (lines 8-16)

```jsx
// Fetch all subjects via useAPI
const { data: subjects, loading: loadingSubjects } = useAPI(
  "/api/academics/subjects/",
);

// Find editing item by ID (converted from route ID)
const editingItem = formId ? subjects.find((item) => item.id == formId) : null;
```

#### Step 2: Populate Form Fields

**File**: [ERP/src/components/Academics/AcademicSubjectForm.jsx](ERP/src/components/Academics/AcademicSubjectForm.jsx) - useEffect (lines 31-37)

```jsx
useEffect(() => {
  if (editingItem) {
    setCode(editingItem.code);
    setName(editingItem.name);
    setDescription(editingItem.description || "");
    setStatus(editingItem.status === "Active");
  }
}, [editingItem]);
```

#### Step 3: Form Submission (PUT)

**File**: [ERP/src/components/Academics/AcademicSubjectForm.jsx](ERP/src/components/Academics/AcademicSubjectForm.jsx) (lines 58-61)

```jsx
if (editingItem) {
  // Update existing subject
  await api.put(`/api/academics/subjects/${editingItem.id}/`, formData);
}
```

#### Step 4: Django Backend Update

**File**: [ERP_Backend/academics/views.py](ERP_Backend/academics/views.py) - `academic_subject_detail()` (lines 116-130)

```python
elif request.method == 'PUT':
    serializer = AcademicSubjectSerializer(subject, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    # SQL: UPDATE academics_academicsubject SET ... WHERE id = ?
```

---

### Flow 3: DELETE Academic Subject

#### Frontend Trigger

**File**: [ERP/src/pages/Academics/AcademicSubject.jsx](ERP/src/pages/Academics/AcademicSubject.jsx) (lines 65-77)

```jsx
const confirmDelete = async () => {
  if (subjectToDelete) {
    try {
      await deleteSubject(subjectToDelete.id);
      setSuccessMessage("Subject deleted successfully");
    } catch (err) {
      setErrorMessage(err.message);
    }
  }
};
```

#### Hook Implementation

**File**: [ERP/src/hooks/useAPI.js](ERP/src/hooks/useAPI.js) - `delete_()` (lines 81-93)

```jsx
const delete_ = async (id) => {
  try {
    setError(null);
    await api.delete(`${endpoint}${id}/`);
    setData(data.filter((d) => d.id !== id));
  } catch (err) {
    // Error handling
    throw err;
  }
};
```

#### Backend Delete

**File**: [ERP_Backend/academics/views.py](ERP_Backend/academics/views.py)

```python
elif request.method == 'DELETE':
    subject.delete()
    # SQL: DELETE FROM academics_academicsubject WHERE id = ?
    return Response(
        {'message': 'Subject deleted successfully'},
        status=status.HTTP_204_NO_CONTENT
    )
```

---

### Flow 4: READ (List & Display)

#### Frontend List Page

**File**: [ERP/src/pages/Academics/AcademicSubject.jsx](ERP/src/pages/Academics/AcademicSubject.jsx) (lines 8-15)

```jsx
const {
  data: subjects,
  loading,
  error,
  delete: deleteSubject,
} = useAPI("/api/academics/subjects/");
```

#### Hook Fetch

**File**: [ERP/src/hooks/useAPI.js](ERP/src/hooks/useAPI.js) - useEffect (lines 17-29)

```jsx
useEffect(() => {
  fetchData();
}, [endpoint]);

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await api.get(endpoint);
    setData(Array.isArray(response.data) ? response.data : []);
  } catch (err) {
    setError(err.response?.data?.error || err.message);
  } finally {
    setLoading(false);
  }
};
```

#### Backend Response

**File**: [ERP_Backend/academics/views.py](ERP_Backend/academics/views.py) - `academic_subject_list()` GET

```python
if request.method == 'GET':
    subjects = AcademicSubject.objects.all()  # SQL: SELECT * FROM academics_academicsubject
    serializer = AcademicSubjectSerializer(subjects, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
```

---

## File Structure and References

### Frontend - React Components

```
ERP/src/
├── components/Academics/
│   ├── AcademicSubjectForm.jsx        ✅ Uses API (POST/PUT)
│   ├── AcademicProgramForm.jsx        ✅ Uses API (POST/PUT)
│   ├── AcademicClassForm.jsx          ✅ Uses API (POST/PUT)
│   ├── AcademicSectionForm.jsx        ✅ Uses API (POST/PUT)
│   └── ProgramTypeForm.jsx            ✅ Uses API (POST/PUT)
├── pages/Academics/
│   ├── AcademicSubject.jsx            ✅ Uses API (GET/DELETE)
│   ├── AcademicProgram.jsx            ✅ Uses API (GET/DELETE)
│   ├── AcademicClass.jsx              ✅ Uses API (GET/DELETE)
│   ├── AcademicSection.jsx            ✅ Uses API (GET/DELETE)
│   └── ProgramType.jsx                ✅ Uses API (GET/DELETE)
├── hooks/
│   ├── useAPI.js                      ✅ Custom hook for CRUD (see below)
│   └── useAuth.jsx
├── services/
│   └── api.js                         ✅ Axios instance with CSRF (see below)
└── tests/
    └── AcademicForms.test.jsx         ✅ Comprehensive test suite
```

### Backend - Django API

```
ERP_Backend/academics/
├── models.py                          ✅ 5 Models for DB schema
├── serializers.py                     ✅ 5 Serializers for validation
├── views.py                           ✅ 10 API endpoints (2 per model)
├── urls.py                            ✅ URL routing
├── migrations/
│   ├── 0001_initial.py                ✅ Create all tables
│   └── ...
└── admin.py
```

---

## API Endpoints

### Subjects

| Method | Endpoint                        | Action   | Status Code |
| ------ | ------------------------------- | -------- | ----------- |
| GET    | `/api/academics/subjects/`      | List all | 200         |
| POST   | `/api/academics/subjects/`      | Create   | 201         |
| GET    | `/api/academics/subjects/{id}/` | Get one  | 200         |
| PUT    | `/api/academics/subjects/{id}/` | Update   | 200         |
| DELETE | `/api/academics/subjects/{id}/` | Delete   | 204         |

### Programs

| Method | Endpoint                        | Action   | Status Code |
| ------ | ------------------------------- | -------- | ----------- |
| GET    | `/api/academics/programs/`      | List all | 200         |
| POST   | `/api/academics/programs/`      | Create   | 201         |
| GET    | `/api/academics/programs/{id}/` | Get one  | 200         |
| PUT    | `/api/academics/programs/{id}/` | Update   | 200         |
| DELETE | `/api/academics/programs/{id}/` | Delete   | 204         |

### Classes

| Method | Endpoint                       | Action   | Status Code |
| ------ | ------------------------------ | -------- | ----------- |
| GET    | `/api/academics/classes/`      | List all | 200         |
| POST   | `/api/academics/classes/`      | Create   | 201         |
| GET    | `/api/academics/classes/{id}/` | Get one  | 200         |
| PUT    | `/api/academics/classes/{id}/` | Update   | 200         |
| DELETE | `/api/academics/classes/{id}/` | Delete   | 204         |

### Sections

| Method | Endpoint                        | Action   | Status Code |
| ------ | ------------------------------- | -------- | ----------- |
| GET    | `/api/academics/sections/`      | List all | 200         |
| POST   | `/api/academics/sections/`      | Create   | 201         |
| GET    | `/api/academics/sections/{id}/` | Get one  | 200         |
| PUT    | `/api/academics/sections/{id}/` | Update   | 200         |
| DELETE | `/api/academics/sections/{id}/` | Delete   | 204         |

### Program Types

| Method | Endpoint                             | Action   | Status Code |
| ------ | ------------------------------------ | -------- | ----------- |
| GET    | `/api/academics/program-types/`      | List all | 200         |
| POST   | `/api/academics/program-types/`      | Create   | 201         |
| GET    | `/api/academics/program-types/{id}/` | Get one  | 200         |
| PUT    | `/api/academics/program-types/{id}/` | Update   | 200         |
| DELETE | `/api/academics/program-types/{id}/` | Delete   | 204         |

---

## Authentication & CSRF

### CSRF Token Handling

**File**: [ERP/src/services/api.js](ERP/src/services/api.js) (lines 15-35)

```javascript
// CSRF token extracted from cookie and added to request headers
api.interceptors.request.use((config) => {
  const getCookie = (name) => {
    // Finds CSRF token in document cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  };

  const csrfToken = getCookie("csrftoken");
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken; // Add to header
  }
  return config;
});
```

### Backend CSRF Middleware

**File**: [ERP_Backend/ERP_Backend/csrf_middleware.py](ERP_Backend/ERP_Backend/csrf_middleware.py)

Ensures CSRF token validation on all POST/PUT/DELETE requests.

### Session Authentication

**File**: [ERP_Backend/academics/views.py](ERP_Backend/academics/views.py)

```python
@permission_classes([IsAuthenticated])
def academic_subject_list(request):
    # Only authenticated users can access
    pass
```

---

## Testing & Error Handling

### Test Suite

**File**: [ERP/src/tests/AcademicForms.test.jsx](ERP/src/tests/AcademicForms.test.jsx)

#### Test Coverage (10 Tests - All Passing ✅)

1. **AcademicSubjectForm**
   - Render form with empty fields
   - Validate required fields
   - Submit form with valid data (CREATE)
   - Handle API errors
   - Disable form during submission

2. **AcademicProgramForm**
   - Render form with program-specific fields
   - Submit form with program fields (program_type, program_fee)

3. **AcademicClassForm**
   - Submit class data to correct endpoint

4. **AcademicSectionForm**
   - Submit section data to correct endpoint

5. **ProgramTypeForm**
   - Submit program type data to correct endpoint

6. **Integration Tests**
   - Verify all forms connected to correct API endpoints

### Error Handling

#### Form Level

**File**: [ERP/src/components/Academics/AcademicSubjectForm.jsx](ERP/src/components/Academics/AcademicSubjectForm.jsx)

```jsx
try {
  setIsSubmitting(true);
  if (editingItem) {
    await api.put(...);
  } else {
    await api.post(...);
  }
  navigate("/academic-subject");
} catch (err) {
  const errorMsg =
    err.response?.data?.error ||           // Backend error message
    err.response?.data?.message ||         // Validation errors
    err.response?.data?.non_field_errors?.[0] ||
    err.message ||                         // Network error
    "Failed to save subject";
  setError(errorMsg);
} finally {
  setIsSubmitting(false);
}
```

#### API Level

**File**: [ERP/src/services/api.js](ERP/src/services/api.js)

```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);
```

#### Backend Level

**File**: [ERP_Backend/academics/views.py](ERP_Backend/academics/views.py)

```python
try:
    program = get_object_or_404(AcademicProgram, pk=pk)
except Exception as e:
    return Response(
        {'error': f'Program not found: {str(e)}'},
        status=status.HTTP_404_NOT_FOUND
    )

if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

---

## Database Schema

### Academic Subject Table

```sql
CREATE TABLE academics_academicsubject (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ON academics_academicsubject(code);
CREATE INDEX ON academics_academicsubject(status);
```

### Academic Program Table

```sql
CREATE TABLE academics_academicprogram (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    program_type VARCHAR(100),
    program_fee DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Academic Class Table

```sql
CREATE TABLE academics_academicclass (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Academic Section Table

```sql
CREATE TABLE academics_academicsection (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Program Type Table

```sql
CREATE TABLE academics_programtype (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Form Components Reference

### AcademicSubjectForm

**File**: [ERP/src/components/Academics/AcademicSubjectForm.jsx](ERP/src/components/Academics/AcademicSubjectForm.jsx)

**Features:**

- ✅ Create new subjects
- ✅ Update existing subjects (by ID)
- ✅ Field validation
- ✅ Error display
- ✅ Loading states
- ✅ Disabled form during submission

**State Management:**

```jsx
const [code, setCode] = useState(""); // String
const [name, setName] = useState(""); // String (Required)
const [description, setDescription] = useState(""); // String
const [status, setStatus] = useState(true); // Boolean (Active/Inactive)
const [error, setError] = useState(""); // Error message
const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
```

**API Calls:**

- **CREATE**: `api.post("/api/academics/subjects/", formData)`
- **UPDATE**: `api.put("/api/academics/subjects/{id}/", formData)`

---

### AcademicProgramForm

**File**: [ERP/src/components/Academics/AcademicProgramForm.jsx](ERP/src/components/Academics/AcademicProgramForm.jsx)

**Additional Fields:**

- `program_type`: String (optional)
- `program_fee`: Decimal (optional)

**API Calls:**

- **CREATE**: `api.post("/api/academics/programs/", formData)`
- **UPDATE**: `api.put("/api/academics/programs/{id}/", formData)`

---

### AcademicClassForm

**File**: [ERP/src/components/Academics/AcademicClassForm.jsx](ERP/src/components/Academics/AcademicClassForm.jsx)

**API Calls:**

- **CREATE**: `api.post("/api/academics/classes/", formData)`
- **UPDATE**: `api.put("/api/academics/classes/{id}/", formData)`

---

### AcademicSectionForm

**File**: [ERP/src/components/Academics/AcademicSectionForm.jsx](ERP/src/components/Academics/AcademicSectionForm.jsx)

**API Calls:**

- **CREATE**: `api.post("/api/academics/sections/", formData)`
- **UPDATE**: `api.put("/api/academics/sections/{id}/", formData)`

---

### ProgramTypeForm

**File**: [ERP/src/components/Academics/ProgramTypeForm.jsx](ERP/src/components/Academics/ProgramTypeForm.jsx)

**API Calls:**

- **CREATE**: `api.post("/api/academics/program-types/", formData)`
- **UPDATE**: `api.put("/api/academics/program-types/{id}/", formData)`

---

## Key Code References

### Custom Hook - useAPI

**File**: [ERP/src/hooks/useAPI.js](ERP/src/hooks/useAPI.js)

This hook provides all CRUD operations:

```javascript
export const useAPI = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ GET - Fetch data
  const fetchData = async () => { ... }

  // ✅ POST - Create
  const create = async (item) => {
    const response = await api.post(endpoint, item);
    setData([...data, response.data]);
    return response.data;
  }

  // ✅ PUT - Update
  const update = async (id, item) => {
    const response = await api.put(`${endpoint}${id}/`, item);
    setData(data.map((d) => (d.id === id ? response.data : d)));
    return response.data;
  }

  // ✅ DELETE
  const delete_ = async (id) => {
    await api.delete(`${endpoint}${id}/`);
    setData(data.filter((d) => d.id !== id));
  }

  return { data, loading, error, create, update, delete_, refetch };
};
```

### Axios Configuration

**File**: [ERP/src/services/api.js](ERP/src/services/api.js)

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Add CSRF token to every request
// Interceptor: Handle 401 errors by redirecting to login
```

---

## Data Flow Summary

### Incoming Data (PostgreSQL → React)

1. User navigates to Academic Subject list page
2. Component calls `useAPI("/api/academics/subjects/")`
3. Hook makes GET request to backend
4. Django returns JSON array of subjects
5. React renders list with data
6. User can click Edit to load form with data

### Outgoing Data (React → PostgreSQL)

1. User fills form and clicks Save
2. Form component validates data locally
3. Form calls `api.post()` or `api.put()`
4. Axios adds CSRF token to request
5. Backend receives request and validates with Serializer
6. Django ORM saves to PostgreSQL
7. Backend returns saved object as JSON
8. React updates state and navigates to list page

---

## Verification Checklist

- ✅ All 5 form components use API (not localStorage)
- ✅ All forms validate data before submission
- ✅ All forms send correct request format to backend
- ✅ All forms handle errors and show messages to user
- ✅ All forms disable inputs during submission
- ✅ All forms navigate to list page after success
- ✅ CSRF token automatically added to all requests
- ✅ Authentication required for all endpoints
- ✅ Database migrations applied to PostgreSQL
- ✅ Comprehensive test suite (10 tests) - All passing ✅
- ✅ No codebase breaking changes
- ✅ Data persists in PostgreSQL, not localStorage
