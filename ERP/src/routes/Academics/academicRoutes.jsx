import AcademicSubject from "../../pages/Academics/AcademicSubject";
import AcademicProgram from "../../pages/Academics/AcademicProgram";
import AcademicClass from "../../pages/Academics/AcademicClass";
import AcademicSection from "../../pages/Academics/AcademicSection";
import ProgramType from "../../pages/Academics/ProgramType";
import AddAcademicsData from "../../pages/Academics/AddAcademicsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const academicRoutes = [
  // Academic Subject
  {
    path: "/academic-subject",
    element: (
      <ProtectedRoute>
        <AcademicSubject />
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
        <AcademicProgram />
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
        <AcademicClass />
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
        <AcademicSection />
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
        <ProgramType />
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
