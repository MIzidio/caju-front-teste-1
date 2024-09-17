import { render, waitFor } from "@testing-library/react";
import DashboardPage from ".";
import axios from "axios";
import { useRegistrationsContext } from "~/context/registrations";
import { useNotification } from "~/context/notification";
import { mockRegistrations } from "~/mocks/registrations";

jest.mock("axios");
jest.mock("~/context/registrations");
jest.mock("~/context/notification");
jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("DashboardPage", () => {
	const setRegistrations = jest.fn();
	const setLoading = jest.fn();
	const setNotification = jest.fn();

	beforeEach(() => {
		(useRegistrationsContext as jest.Mock).mockReturnValue({
			setRegistrations,
			setLoading,
		});
		(useNotification as jest.Mock).mockReturnValue({
			setNotification,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should set loading to true initially", () => {
		render(<DashboardPage />);
		expect(setLoading).toHaveBeenCalledWith(true);
	});

	it("should fetch registrations and set them on success", async () => {
		mockedAxios.get.mockResolvedValue({ data: mockRegistrations });

		render(<DashboardPage />);

		await waitFor(() => {
			expect(setRegistrations).toHaveBeenCalledWith(mockRegistrations);
			expect(setNotification).toHaveBeenCalledWith({
				message: "Dados carregados com sucesso",
				type: "success",
			});
			expect(setLoading).toHaveBeenCalledWith(false);
		});
	});

	it("should show error notification on fetch failure", async () => {
		mockedAxios.get.mockRejectedValue(new Error("Fetch error"));

		render(<DashboardPage />);

		await waitFor(() => {
			expect(setNotification).toHaveBeenCalledWith({
				message: "Erro ao carregar dados",
				type: "error",
			});
			expect(setLoading).toHaveBeenCalledWith(false);
		});
	});
});
