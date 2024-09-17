import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useHistory } from "react-router-dom";
import { useRegistrationsContext } from "~/context/registrations";
import SearchBar from ".";
import axios from "axios";

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("~/context/registrations", () => ({
	useRegistrationsContext: jest.fn(),
}));

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SearchBar", () => {
	const mockHistoryPush = jest.fn();
	const mockSetRegistrations = jest.fn();
	const mockSetLoading = jest.fn();

	beforeEach(() => {
		(useHistory as jest.Mock).mockReturnValue({ push: mockHistoryPush });
		(useRegistrationsContext as jest.Mock).mockReturnValue({
			setRegistrations: mockSetRegistrations,
			setLoading: mockSetLoading,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should render SearchBar correctly", () => {
		render(<SearchBar />);
		expect(
			screen.getByPlaceholderText("Digite um CPF válido")
		).toBeInTheDocument();
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	it("Should navigate to new admission page on button click", () => {
		render(<SearchBar />);
		fireEvent.click(screen.getByText("Nova Admissão"));
		expect(mockHistoryPush).toHaveBeenCalledWith("/new-user");
	});

	it("Should call fetchRegistrations on component mount", async () => {
		mockedAxios.get.mockResolvedValue({ data: [] });
		render(<SearchBar />);
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				"http://localhost:3000/registrations?cpf=&status="
			);
		});
	});

	it("Should call setRegistrations and setLoading correctly", async () => {
		const mockData = [{ id: 1, name: "John Doe" }];
		mockedAxios.get.mockResolvedValue({ data: mockData });
		render(<SearchBar />);
		await waitFor(() => {
			expect(mockSetLoading).toHaveBeenCalledWith(true);
			expect(mockedAxios.get).toHaveBeenCalledWith(
				"http://localhost:3000/registrations?cpf=&status="
			);
			expect(mockSetRegistrations).toHaveBeenCalledWith(mockData);
			expect(mockSetLoading).toHaveBeenCalledWith(false);
		});
	});
});
