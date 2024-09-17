import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useHistory } from "react-router-dom";
import { useRegistrationsContext } from "~/context/registrations";
import { useNotification } from "~/context/notification";
import NewUserPage from ".";
import axios from "axios";

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("~/context/registrations", () => ({
	useRegistrationsContext: jest.fn(),
}));

jest.mock("~/context/notification", () => ({
	useNotification: jest.fn(),
}));

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("NewUserPage", () => {
	const mockHistoryPush = jest.fn();
	const mockSetRegistrations = jest.fn();
	const mockSetNotification = jest.fn();

	beforeEach(() => {
		(useHistory as jest.Mock).mockReturnValue({ push: mockHistoryPush });
		(useRegistrationsContext as jest.Mock).mockReturnValue({
			registrations: [],
			setRegistrations: mockSetRegistrations,
		});
		(useNotification as jest.Mock).mockReturnValue({
			setNotification: mockSetNotification,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should submit form and handle success response", async () => {
		mockedAxios.post.mockResolvedValue({ data: { id: 1, name: "John Doe" } });

		render(<NewUserPage />);

		fireEvent.change(screen.getByPlaceholderText("Nome"), {
			target: { value: "John Doe" },
		});
		fireEvent.change(screen.getByPlaceholderText("Email"), {
			target: { value: "john.doe@example.com" },
		});
		fireEvent.change(screen.getByPlaceholderText("000.000.000-00"), {
			target: { value: "123.456.789-00" },
		});
		fireEvent.change(screen.getByLabelText("Data de admissão"), {
			target: { value: "2023-01-01" },
		});

		fireEvent.click(screen.getByText("Cadastrar"));

		await waitFor(() => {
			expect(mockedAxios.post).toHaveBeenCalledWith(
				"http://localhost:3000/registrations",
				expect.objectContaining({
					employeeName: "John Doe",
					email: "john.doe@example.com",
					cpf: "12345678900",
					admissionDate: "01/01/2023",
					status: "REVIEW",
				})
			);
			expect(mockSetRegistrations).toHaveBeenCalledWith([
				{ id: 1, name: "John Doe" },
			]);
			expect(mockSetNotification).toHaveBeenCalledWith({
				message: "Formulário enviado com sucesso!",
				type: "success",
			});
			expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard");
		});
	});

	it("Should handle form submission error", async () => {
		mockedAxios.post.mockRejectedValue(new Error("Network Error"));

		render(<NewUserPage />);

		fireEvent.change(screen.getByPlaceholderText("Nome"), {
			target: { value: "John Doe" },
		});
		fireEvent.change(screen.getByPlaceholderText("Email"), {
			target: { value: "john.doe@example.com" },
		});
		fireEvent.change(screen.getByPlaceholderText("000.000.000-00"), {
			target: { value: "123.456.789-00" },
		});
		fireEvent.change(screen.getByLabelText("Data de admissão"), {
			target: { value: "2023-01-01" },
		});

		fireEvent.click(screen.getByText("Cadastrar"));

		await waitFor(() => {
			expect(mockSetNotification).toHaveBeenCalledWith({
				message: "Erro ao enviar o formulário. Tente novamente.",
				type: "error",
			});
		});
	});
});
