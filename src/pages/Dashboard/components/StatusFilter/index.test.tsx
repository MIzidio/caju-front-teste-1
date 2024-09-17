import { render, screen, fireEvent } from "@testing-library/react";
import StatusFilter from ".";

describe("StatusFilter", () => {
	it("Should render StatusFilter correctly", () => {
		render(<StatusFilter setStatus={jest.fn()} status="" />);
		expect(screen.getByRole("combobox")).toBeInTheDocument();
		expect(screen.getByText("Todos os Status")).toBeInTheDocument();
		expect(screen.getByText("Aprovado")).toBeInTheDocument();
		expect(screen.getByText("Reprovado")).toBeInTheDocument();
		expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
	});

	it("Should call setStatus with the correct value", () => {
		const setStatusMock = jest.fn();
		render(<StatusFilter setStatus={setStatusMock} status="" />);
		fireEvent.change(screen.getByRole("combobox"), {
			target: { value: "APPROVED" },
		});
		expect(setStatusMock).toHaveBeenCalledWith("APPROVED");
	});

	it("Should select the correct option based on the status prop", () => {
		const { rerender } = render(
			<StatusFilter setStatus={jest.fn()} status="APPROVED" />
		);
		expect(screen.getByRole("combobox")).toHaveValue("APPROVED");

		rerender(<StatusFilter setStatus={jest.fn()} status="REPROVED" />);
		expect(screen.getByRole("combobox")).toHaveValue("REPROVED");

		rerender(<StatusFilter setStatus={jest.fn()} status="REVIEW" />);
		expect(screen.getByRole("combobox")).toHaveValue("REVIEW");
	});
});
