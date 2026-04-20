# Asset Management - Real-World Sample Data

## Summary

✅ All 4 asset management pages have been populated with realistic, real-world entries.

---

## 1️⃣ Asset Types (5 Entries)

| Code    | Type Name       | Description                         | Status |
| ------- | --------------- | ----------------------------------- | ------ |
| AT-0001 | Equipment       | Industrial and production equipment | Active |
| AT-0002 | Furniture       | Office and facility furniture       | Active |
| AT-0003 | Vehicles        | Transportation and company vehicles | Active |
| AT-0004 | Technology      | IT equipment and technology assets  | Active |
| AT-0005 | Office Supplies | Office fixtures and supplies        | Active |

---

## 2️⃣ Asset Sub Types (11 Entries)

### Equipment Sub Types (3)

| Code     | Sub Type Name   | Parent Type | Description                        | Status |
| -------- | --------------- | ----------- | ---------------------------------- | ------ |
| AST-0001 | Machinery       | Equipment   | Industrial machinery and equipment | Active |
| AST-0002 | Tools           | Equipment   | Hand tools and power tools         | Active |
| AST-0003 | Production Line | Equipment   | Assembly and production equipment  | Active |

### Furniture Sub Types (2)

| Code     | Sub Type Name | Parent Type | Description                   | Status |
| -------- | ------------- | ----------- | ----------------------------- | ------ |
| AST-0004 | Desks         | Furniture   | Office desks and workstations | Active |
| AST-0005 | Chairs        | Furniture   | Office chairs and seating     | Active |

### Vehicles Sub Types (2)

| Code     | Sub Type Name | Parent Type | Description               | Status |
| -------- | ------------- | ----------- | ------------------------- | ------ |
| AST-0006 | Cars          | Vehicles    | Company cars and sedans   | Active |
| AST-0007 | Trucks        | Vehicles    | Trucks and cargo vehicles | Active |

### Technology Sub Types (3)

| Code     | Sub Type Name | Parent Type | Description                      | Status |
| -------- | ------------- | ----------- | -------------------------------- | ------ |
| AST-0008 | Computers     | Technology  | Desktop and laptop computers     | Active |
| AST-0009 | Servers       | Technology  | Database and application servers | Active |
| AST-0010 | Printers      | Technology  | Printers and scanning devices    | Active |

### Office Supplies Sub Types (1)

| Code     | Sub Type Name | Parent Type     | Description                | Status |
| -------- | ------------- | --------------- | -------------------------- | ------ |
| AST-0011 | Fixtures      | Office Supplies | Lighting and wall fixtures | Active |

---

## 3️⃣ Asset Statuses (5 Entries)

| Code    | Status Name    | Description                          | Status |
| ------- | -------------- | ------------------------------------ | ------ |
| AS-0001 | Active         | Asset is actively in use             | Active |
| AS-0002 | In Maintenance | Asset is under maintenance or repair | Active |
| AS-0003 | Depreciated    | Asset has been fully depreciated     | Active |
| AS-0004 | Disposed       | Asset has been disposed or retired   | Active |
| AS-0005 | In Storage     | Asset is stored and not in use       | Active |

---

## 4️⃣ Asset Locations (5 Entries)

| Code    | Location Name     | Description                     | Status |
| ------- | ----------------- | ------------------------------- | ------ |
| AL-0001 | Warehouse Main    | Main warehouse storage facility | Active |
| AL-0002 | Office Building A | Main office building floor 1-3  | Active |
| AL-0003 | Office Building B | Secondary office building       | Active |
| AL-0004 | Factory Floor     | Production facility floor       | Active |
| AL-0005 | Storage Room      | General storage room            | Active |

---

## 📊 Total Records Added

- **Asset Types**: 5
- **Asset Sub Types**: 11
- **Asset Statuses**: 5
- **Asset Locations**: 5
- **Total**: 26 records

---

## ✨ Features Available

### Asset Type Page (`/assettype`)

- View all 5 asset types
- Search by code, type name, description, or status
- Create new asset types
- Edit existing asset types
- Delete asset types with confirmation
- All data synced with PostgreSQL

### Asset Sub Type Page (`/asset-sub-type`)

- View all 11 asset sub types
- Filter by parent asset type
- Search by code, sub type name, or description
- Create new sub types with parent type selection
- Edit existing sub types
- Delete sub types with confirmation

### Asset Status Page (`/assetstatus`)

- View all 5 asset statuses
- Search by code or status name
- Create new statuses
- Edit existing statuses
- Delete statuses with confirmation
- Common statuses for asset lifecycle management

### Asset Location Page (`/assetlocation`)

- View all 5 asset locations
- Search by code or location name
- Create new locations
- Edit existing locations
- Delete locations with confirmation
- Track asset storage locations

---

## 🔐 Authentication

All pages require user login. Data is persisted in PostgreSQL and accessible across sessions.

## 📍 API Endpoints

```
GET    /api/assets/assettype/              - List all asset types
POST   /api/assets/assettype/              - Create new asset type
GET    /api/assets/assettype/{id}/         - Get asset type details
PUT    /api/assets/assettype/{id}/         - Update asset type
DELETE /api/assets/assettype/{id}/         - Delete asset type

GET    /api/assets/assetsubtype/           - List all asset sub types
POST   /api/assets/assetsubtype/           - Create new sub type
GET    /api/assets/assetsubtype/{id}/      - Get sub type details
PUT    /api/assets/assetsubtype/{id}/      - Update sub type
DELETE /api/assets/assetsubtype/{id}/      - Delete sub type

GET    /api/assets/assetstatus/            - List all asset statuses
POST   /api/assets/assetstatus/            - Create new status
GET    /api/assets/assetstatus/{id}/       - Get status details
PUT    /api/assets/assetstatus/{id}/       - Update status
DELETE /api/assets/assetstatus/{id}/       - Delete status

GET    /api/assets/assetlocation/          - List all locations
POST   /api/assets/assetlocation/          - Create new location
GET    /api/assets/assetlocation/{id}/     - Get location details
PUT    /api/assets/assetlocation/{id}/     - Update location
DELETE /api/assets/assetlocation/{id}/     - Delete location
```

---

## 🎯 Next Steps

1. Access the asset management pages from the sidebar
2. Login with your credentials
3. Browse through the 4 pages to see the sample data
4. Test creating, editing, and deleting entries
5. Monitor the Django Admin panel at `/admin/` for all operations
