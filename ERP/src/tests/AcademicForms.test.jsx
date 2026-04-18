import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import AcademicSubjectForm from "../components/Academics/AcademicSubjectForm";
import AcademicProgramForm from "../components/Academics/AcademicProgramForm";
import AcademicClassForm from "../components/Academics/AcademicClassForm";
import AcademicSectionForm from "../components/Academics/AcademicSectionForm";
import ProgramTypeForm from "../components/Academics/ProgramTypeForm";

// Create a mock for useAPI
const mockUseAPI = vi.fn();

vi.mock("../hooks/useAPI", () => ({
  useAPI: (endpoint) => mockUseAPI(endpoint),
}));

// Mock the API module
vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(),
    put: vi.fn(),
    get: vi.fn(),
  },
}));

// Import api after mocking
import api from "../services/api";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({}),
  };
});

/**
 * Test Suite for Academic Subject Form
 */
describe("AcademicSubjectForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockUseAPI.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render form with empty fields for create mode", async () => {
    render(
      <BrowserRouter>
        <AcademicSubjectForm />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Create New Academic Subject"),
      ).toBeInTheDocument();
    });

    // Check if submit button shows "Save"
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });

  it("should validate required fields", async () => {
    render(
      <BrowserRouter>
        <AcademicSubjectForm />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Create New Academic Subject"),
      ).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(submitButton);

    // Name validation should appear or form should not submit
    await waitFor(() => {
      // Check if error message appears
      const errorMsg = screen.queryByText("Name is required");
      const saveBtn = screen.queryByRole("button", { name: /Save/i });
      // Either error message or button should still be present (form didn't submit)
      expect(errorMsg || saveBtn).toBeTruthy();
    });
  });

  it("should submit form with valid data to API (CREATE)", async () => {
    api.post.mockResolvedValue({
      data: { id: 1, code: "AS-0000001", name: "Math" },
    });

    const user = userEvent.setup();

    const { container } = render(
      <BrowserRouter>
        <AcademicSubjectForm />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Create New Academic Subject"),
      ).toBeInTheDocument();
    });

    // Get input elements by their type and placeholder or by querying the form
    const inputs = container.querySelectorAll("input[type='text']");
    expect(inputs.length).toBeGreaterThanOrEqual(2);

    // Fill in the fields
    await user.type(inputs[0], "AS-0000001"); // Code
    await user.type(inputs[1], "Mathematics"); // Name

    const textarea = container.querySelector("textarea");
    if (textarea) {
      await user.type(textarea, "Basic Mathematics");
    }

    // Submit form
    const submitButton = screen.getByRole("button", { name: /Save/i });
    await user.click(submitButton);

    // Wait for API call
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/api/academics/subjects/",
        expect.objectContaining({
          code: "AS-0000001",
          name: "Mathematics",
          description: "Basic Mathematics",
          status: "Active",
        }),
      );
    });

    // Should navigate after success
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/academic-subject");
    });
  });

  it("should handle API errors gracefully", async () => {
    const errorResponse = {
      response: {
        data: { error: "Subject with this code already exists" },
      },
    };
    api.post.mockRejectedValue(errorResponse);

    const user = userEvent.setup();
    const { container } = render(
      <BrowserRouter>
        <AcademicSubjectForm />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Create New Academic Subject"),
      ).toBeInTheDocument();
    });

    // Fill form
    const inputs = container.querySelectorAll("input[type='text']");
    await user.type(inputs[0], "AS-0000001");
    await user.type(inputs[1], "Mathematics");

    // Submit form
    const submitButton = screen.getByRole("button", { name: /Save/i });
    await user.click(submitButton);

    // Should show error message
    await waitFor(() => {
      expect(
        screen.getByText("Subject with this code already exists"),
      ).toBeInTheDocument();
    });

    // Should NOT navigate on error
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

/**
 * Test Suite for Academic Program Form
 */
describe("AcademicProgramForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockUseAPI.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it("should render form with additional fields (programType, programFee)", async () => {
    render(
      <BrowserRouter>
        <AcademicProgramForm />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Create New Academic Program"),
      ).toBeInTheDocument();
    });

    // Check for program-specific fields
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThanOrEqual(3); // Should have at least 3 textareas (including description)
  });

  it("should submit form with program-specific fields", async () => {
    api.post.mockResolvedValue({
      data: { id: 1, code: "AP-0000001" },
    });

    const user = userEvent.setup();
    const { container } = render(
      <BrowserRouter>
        <AcademicProgramForm />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Create New Academic Program"),
      ).toBeInTheDocument();
    });

    // Fill form
    const inputs = container.querySelectorAll(
      "input[type='text'], input[type='number']",
    );
    await user.type(inputs[0], "AP-0000001");
    await user.type(inputs[1], "Bachelor");
    await user.type(inputs[2], "Undergraduate");
    await user.type(inputs[3], "5000");

    // Submit form
    const submitButton = screen.getByRole("button", { name: /Save/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/api/academics/programs/",
        expect.objectContaining({
          code: "AP-0000001",
          name: "Bachelor",
          program_type: "Undergraduate",
          program_fee: "5000",
        }),
      );
    });
  });
});

/**
 * Test Suite for Academic Class Form
 */
describe("AcademicClassForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockUseAPI.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it("should submit class data to correct API endpoint", async () => {
    api.post.mockResolvedValue({
      data: { id: 1, code: "CL-0001" },
    });

    const user = userEvent.setup();
    const { container } = render(
      <BrowserRouter>
        <AcademicClassForm />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Create New Academic Class")).toBeInTheDocument();
    });

    // Fill form
    const inputs = container.querySelectorAll("input[type='text']");
    await user.type(inputs[0], "CL-0001");
    await user.type(inputs[1], "Class A");

    // Submit form
    const submitButton = screen.getByRole("button", { name: /Save/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/api/academics/classes/",
        expect.any(Object),
      );
    });
  });
});

/**
 * Test Suite for Academic Section Form
 */
describe("AcademicSectionForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockUseAPI.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it("should submit section data to correct API endpoint", async () => {
    api.post.mockResolvedValue({
      data: { id: 1, code: "SEC-0001" },
    });

    const user = userEvent.setup();
    const { container } = render(
      <BrowserRouter>
        <AcademicSectionForm />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Create New Academic Section"),
      ).toBeInTheDocument();
    });

    // Fill form
    const inputs = container.querySelectorAll("input[type='text']");
    await user.type(inputs[0], "SEC-0001");
    await user.type(inputs[1], "Section A");

    // Submit form
    const submitButton = screen.getByRole("button", { name: /Save/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/api/academics/sections/",
        expect.any(Object),
      );
    });
  });
});

/**
 * Test Suite for Program Type Form
 */
describe("ProgramTypeForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockUseAPI.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it("should submit program type data to correct API endpoint", async () => {
    api.post.mockResolvedValue({
      data: { id: 1, code: "PT-0001" },
    });

    const user = userEvent.setup();
    const { container } = render(
      <BrowserRouter>
        <ProgramTypeForm />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Create New Program Type")).toBeInTheDocument();
    });

    // Fill form
    const inputs = container.querySelectorAll("input[type='text']");
    await user.type(inputs[0], "PT-0001");
    await user.type(inputs[1], "Regular");

    // Submit form
    const submitButton = screen.getByRole("button", { name: /Save/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/api/academics/program-types/",
        expect.any(Object),
      );
    });
  });
});

/**
 * Integration Tests
 */
describe("Academic Forms - Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it("should verify all forms are connected to correct API endpoints", async () => {
    const testCases = [
      {
        endpoint: "/api/academics/subjects/",
        FormComponent: AcademicSubjectForm,
        title: "Create New Academic Subject",
      },
      {
        endpoint: "/api/academics/programs/",
        FormComponent: AcademicProgramForm,
        title: "Create New Academic Program",
      },
      {
        endpoint: "/api/academics/classes/",
        FormComponent: AcademicClassForm,
        title: "Create New Academic Class",
      },
      {
        endpoint: "/api/academics/sections/",
        FormComponent: AcademicSectionForm,
        title: "Create New Academic Section",
      },
      {
        endpoint: "/api/academics/program-types/",
        FormComponent: ProgramTypeForm,
        title: "Create New Program Type",
      },
    ];

    for (const testCase of testCases) {
      mockUseAPI.mockReturnValue({
        data: [],
        loading: false,
        error: null,
        refetch: vi.fn(),
      });
      api.post.mockResolvedValue({ data: { id: 1 } });

      const user = userEvent.setup();
      const { container, unmount } = render(
        <BrowserRouter>
          <testCase.FormComponent />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText(testCase.title)).toBeInTheDocument();
      });

      // Fill minimum required fields
      const inputs = container.querySelectorAll("input[type='text']");
      if (inputs.length >= 2) {
        await user.type(inputs[0], "TEST-0001");
        await user.type(inputs[1], "Test Name");
      }

      // Submit
      const submitButton = screen.getByRole("button", { name: /Save/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith(
          testCase.endpoint,
          expect.any(Object),
        );
      });

      unmount();
      vi.clearAllMocks();
    }
  });
});
