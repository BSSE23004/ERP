import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  Nav,
  Badge,
  Dropdown,
} from "react-bootstrap";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AppNavbar({ onSearch }) {
  const [q, setQ] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (q.trim()) onSearch(q.trim());
  };
  // For Logout
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Navbar bg="light" expand="lg" className="px-3" fixed="top">
      <Container fluid>
        <Link to="/home">
          <img
            src="https://demo.algosofttech.com/admin/assets/img/logo.png"
            alt="Algo ERP"
            style={{ height: "2rem" }}
          />
        </Link>

        {/* Right aligned items */}
        <div className="d-flex ms-auto align-items-center gap-3">
          {/* Search Input + Button */}
          <Form className="d-flex align-items-center" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Search Here ..."
              className="me-2"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Button variant="outline-secondary" type="submit">
              <img
                src="https://demo.algosofttech.com/admin/assets/img/icons/search.svg"
                alt="Search"
              />
            </Button>
          </Form>

          {/* Notification Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" bsPrefix="p-0 position-relative">
              <img
                src="https://demo.algosofttech.com/admin/assets/img/icons/notification-bing.svg"
                alt="Notifications"
              />
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 end-0"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Notifications</Dropdown.Header>
              <Dropdown.Item href="#">Clear All</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="activities.html">
                View all Notifications
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Logout Button */}
          <Button
            variant="warning"
            className="text-white text-decoration-none"
            style={{ backgroundColor: "#ff6600" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
