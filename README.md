# ALGO ERP

A modern ERP (Enterprise Resource Planning) web application built with React, Vite, and Bootstrap. This project was developed as an internship project and demonstrates a modular, scalable ERP frontend with authentication, protected routes, and a rich sidebar navigation for various business modules.

## Features

- **User Authentication**: Login system with protected routes.
- **Modular Sidebar Navigation**: Access to modules like Academic, Accounts, Asset Management, Attendance, CRM, Dashboard, Employee Self Service, Feedback, Front Office, HRIS, Inventory, Payroll, Point of Sale, Production, Property Management, Security, and Settings.
- **Responsive UI**: Built with Bootstrap 5 and custom styles for a modern look.
- **Demo User**: Pre-seeded demo user for easy login (`demo` / `demo123`).
- **Search and Notifications**: Navbar includes search and notification dropdowns.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BSSE23004/ERP.git
   cd ERP/ERP
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:

```bash
npm run dev
```

This will launch the app at [http://localhost:5173](http://localhost:5173) (default Vite port).

### Building for Production

To build the app for production:

```bash
npm run build
```

The output will be in the `dist/` folder.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Usage

- On first load, a demo user is seeded automatically.
- Login with:
  - **Username:** `demo`
  - **Password:** `demo123`
- After login, you can explore the various modules via the sidebar.

## Project Structure

```
ERP/
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # Reusable React components (Login, Navbar, Sidebar, etc.)
│   ├── context/      # React Context for authentication
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components (Home, UserLogin)
│   ├── utils/        # Utility functions (seedUser.js)
│   └── ...           # Styles and other files
├── index.html        # Main HTML file
├── package.json      # Project metadata and scripts
├── vite.config.js    # Vite configuration
└── ...
```

## License

This project is licensed under the [GNU GPL v3](../LICENSE).

## Credits

- Internship project by BSSE23004
- UI inspired by [ALGO SoftTech](https://demo.algosofttech.com/)
