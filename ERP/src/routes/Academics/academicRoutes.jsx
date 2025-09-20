import AcademicSubject from "../../pages/Academics/AcademicSubject";
import AcademicProgram from "../../pages/Academics/AcademicProgram";
import AcademicClass from "../../pages/Academics/AcademicClass";
import AcademicSection from "../../pages/Academics/AcademicSection";
import ProgramType from "../../pages/Academics/ProgramType";
import AddAcademicsData from "../../pages/Academics/AddAcademicsData";
import ProtectedRoute from "../../components/ProtectedRoute";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import Sidebar from "../../components/PagesTemplate/Sidebar";

export const academicRoutes = [
  // Academic Subject
  {
    path: "/academic-subject",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AcademicSubject />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addacademicsubject",
    element: (
      <ProtectedRoute>
        <AddAcademicsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editacademicsubject/:id",
    element: (
      <ProtectedRoute>
        <AddAcademicsData />
      </ProtectedRoute>
    ),
  },
  // Academic Program
  {
    path: "/academic-program",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AcademicProgram />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addacademicprogram",
    element: (
      <ProtectedRoute>
        <AddAcademicsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editacademicprogram/:id",
    element: (
      <ProtectedRoute>
        <AddAcademicsData />
      </ProtectedRoute>
    ),
  },
  // Academic Class
  {
    path: "/academic-class",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AcademicClass />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addacademicclass",
    element: (
      <ProtectedRoute>
        <AddAcademicsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editacademicclass/:id",
    element: (
      <ProtectedRoute>
        <AddAcademicsData />
      </ProtectedRoute>
    ),
  },
  // Academic Section
  {
    path: "/academic-section",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AcademicSection />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addacademicsection",
    element: (
      <ProtectedRoute>
        <AddAcademicsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editacademicsection/:id",
    element: (
      <ProtectedRoute>
        <AddAcademicsData />
      </ProtectedRoute>
    ),
  },
  // Program Type
  {
    path: "/program-type",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <ProgramType />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addprogramtype",
    element: (
      <ProtectedRoute>
        <AddAcademicsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editprogramtype/:id",
    element: (
      <ProtectedRoute>
        <AddAcademicsData />
      </ProtectedRoute>
    ),
  },
];
