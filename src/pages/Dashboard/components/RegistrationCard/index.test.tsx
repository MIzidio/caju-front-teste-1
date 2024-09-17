import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRegistrationsContext } from "~/context/registrations";
import { useNotification } from "~/context/notification";
import RegistrationCard from ".";
import {
	mockRegistrations,
	mockUpdatedRegistrations,
} from "~/mocks/registrations";
import axios from "axios";

jest.mock("~/context/registrations", () => ({
	useRegistrationsContext: jest.fn(),
}));

jest.mock("~/context/notification", () => ({
	useNotification: jest.fn(),
}));

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("RegistrationCard handleStatus", () => {
	const mockSetRegistrations = jest.fn();
	const mockSetLoading = jest.fn();
	const mockSetNotification = jest.fn();

	beforeEach(() => {
		(useRegistrationsContext as jest.Mock).mockReturnValue({
			registrations: mockRegistrations,
			setRegistrations: mockSetRegistrations,
			setLoading: mockSetLoading,
		});
		(useNotification as jest.Mock).mockReturnValue({
			setNotification: mockSetNotification,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should set loading state correctly", async () => {
		mockedAxios.put.mockResolvedValue({
			data: { ...mockRegistrations[0], status: "APPROVED" },
		});

		render(<RegistrationCard data={mockRegistrations[1]} />);
		const approveButton = screen.getByText("Aprovar");
		fireEvent.click(approveButton);
		const confirmButton = screen.getByText("Confirmar");
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(mockSetLoading).toHaveBeenCalledWith(true);
			expect(mockSetLoading).toHaveBeenCalledWith(false);
		});
	});

	it("Should update registration status correctly", async () => {
		const updatedRegistration = { ...mockRegistrations[1], status: "APPROVED" };
		mockedAxios.put.mockResolvedValue({ data: updatedRegistration });

		render(<RegistrationCard data={mockRegistrations[1]} />);
		const approveButton = screen.getByText("Aprovar");
		fireEvent.click(approveButton);
		const confirmButton = screen.getByText("Confirmar");
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(mockedAxios.put).toHaveBeenCalledWith(
				`http://localhost:3000/registrations/1`,
				updatedRegistration
			);
			expect(mockSetRegistrations).toHaveBeenCalledWith(
				mockUpdatedRegistrations
			);
		});
	});

	it("Should handle API errors correctly", async () => {
		mockedAxios.put.mockRejectedValueOnce(new Error("API Error"));

		render(<RegistrationCard data={mockRegistrations[1]} />);
		const approveButton = screen.getByText("Aprovar");
		fireEvent.click(approveButton);
		const confirmButton = screen.getByText("Confirmar");
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(mockSetLoading).toHaveBeenCalledWith(false);
			expect(mockSetNotification).toHaveBeenCalledWith({
				message: "Erro ao realizar ação. Por favor, tente novamente.",
				type: "error",
			});
		});
	});
});
