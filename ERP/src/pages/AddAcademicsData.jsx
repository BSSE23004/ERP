import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import AcademicSubjectForm from "../components/AcademicSubjectForm";
import ProgramTypeForm from "../components/ProgramTypeForm";
import AcademicProgramForm from "../components/AcademicProgramForm";
import AcademicClassForm from "../components/AcademicClassForm";
import AcademicSectionForm from "../components/AcademicSectionForm";
import AccountGroupForm from "../components/AccountGroupForm";
import AccountNatureForm from "../components/AccountNatureForm";
import { useParams, useLocation } from "react-router-dom";

export default function AddAcademicsData() {
  const { id } = useParams();
  const location = useLocation();

  const isProgramType = location.pathname.includes("programtype");
  const isAcademicProgram = location.pathname.includes("academicprogram");
  const isAcademicClass = location.pathname.includes("academicclass");
  const isAcademicSection = location.pathname.includes("academicsection");
  const isAccountGroup = location.pathname.includes("accountgroup");
  const isAccountNature = location.pathname.includes("accountnature");

  let formComponent = null;
  if (isAccountNature) {
    formComponent = <AccountNatureForm id={id} />;
  } else if (isAccountGroup) {
    formComponent = <AccountGroupForm id={id} />;
  } else if (isAcademicProgram) {
    formComponent = <AcademicProgramForm id={id} />;
  } else if (isProgramType) {
    formComponent = <ProgramTypeForm id={id} />;
  } else if (isAcademicClass) {
    formComponent = <AcademicClassForm id={id} />;
  } else if (isAcademicSection) {
    formComponent = <AcademicSectionForm id={id} />;
  } else {
    formComponent = <AcademicSubjectForm id={id} />;
  }

  return (
    <div className="d-flex flex-row justify-content-start vw-100">
      <Sidebar />
      <div
        className="flex-fill d-flex flex-column width-100"
        style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
      >
        <AppNavbar />
        <div style={{ flex: 1, padding: "2rem 2rem 0 2rem", marginTop: 50 }}>
          <div className="bg-white rounded shadow-sm p-4">{formComponent}</div>
        </div>
      </div>
    </div>
  );
}
