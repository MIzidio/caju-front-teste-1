import { render, screen } from "@testing-library/react";
import Collumns from ".";
import { useRegistrationsContext } from "~/context/registrations";
import { mockRegistrations } from "~/mocks/registrations";

jest.mock("~/context/registrations");

const mockUseRegistrationsContext =
	useRegistrationsContext as jest.MockedFunction<
		typeof useRegistrationsContext
	>;

const mockAllColumns = [
	{ status: "REVIEW", title: "Pronto para revisar" },
	{ status: "APPROVED", title: "Aprovado" },
	{ status: "REPROVED", title: "Reprovado" },
];

describe("Collumns", () => {
	it("Should render Collumns without crashing", () => {
		mockUseRegistrationsContext.mockReturnValue({
			registrations: [],
			loading: false,
			setRegistrations: jest.fn(),
			setLoading: jest.fn(),
		});
		render(<Collumns />);
		expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
	});

	it("Should display loading state", () => {
		mockUseRegistrationsContext.mockReturnValue({
			registrations: [],
			loading: true,
			setRegistrations: jest.fn(),
			setLoading: jest.fn(),
		});
		render(<Collumns />);
		expect(screen.getAllByRole("status")).toHaveLength(mockAllColumns.length);
	});

	it("Should display the correct number of columns", () => {
		mockUseRegistrationsContext.mockReturnValue({
			registrations: [],
			loading: false,
			setRegistrations: jest.fn(),
			setLoading: jest.fn(),
		});
		render(<Collumns />);
		expect(screen.getAllByRole("column")).toHaveLength(mockAllColumns.length);
	});

	it("Should display the correct titles for columns", () => {
		mockUseRegistrationsContext.mockReturnValue({
			registrations: [],
			loading: false,
			setRegistrations: jest.fn(),
			setLoading: jest.fn(),
		});
		render(<Collumns />);
		mockAllColumns.forEach((column) => {
			expect(screen.getByText(column.title)).toBeInTheDocument();
		});
	});

	it("Should display RegistrationCard components correctly", () => {
		mockUseRegistrationsContext.mockReturnValue({
			registrations: mockRegistrations,
			loading: false,
			setRegistrations: jest.fn(),
			setLoading: jest.fn(),
		});
		render(<Collumns />);
		mockRegistrations.forEach((registration) => {
			expect(
				screen.getByText(`${registration.employeeName}`)
			).toBeInTheDocument();
		});
	});
});
