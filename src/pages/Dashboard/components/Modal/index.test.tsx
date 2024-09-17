import { render, screen, fireEvent } from "@testing-library/react";
import Modal from ".";

jest.mock("./styles", () => ({
	ModalWrapper: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	ModalContent: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	ModalHeader: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	ConfirmButton: ({
		children,
		onClick,
	}: {
		children: React.ReactNode;
		onClick: () => void;
	}) => <button onClick={onClick}>{children}</button>,
	CancelButton: ({
		children,
		onClick,
	}: {
		children: React.ReactNode;
		onClick: () => void;
	}) => <button onClick={onClick}>{children}</button>,
}));

describe("Modal", () => {
	it("Should render Modal when isOpen is true", () => {
		render(
			<Modal
				isOpen={true}
				action="Deletar"
				onConfirm={jest.fn()}
				onCancel={jest.fn()}
			/>
		);
		expect(screen.getByText("Confirmar deletar")).toBeInTheDocument();
		expect(
			screen.getByText("Tem certeza que deseja deletar este registro?")
		).toBeInTheDocument();
		expect(screen.getByText("Confirmar")).toBeInTheDocument();
		expect(screen.getByText("Cancelar")).toBeInTheDocument();
	});

	it("Should not render Modal when isOpen is false", () => {
		const { container } = render(
			<Modal
				isOpen={false}
				action="Deletar"
				onConfirm={jest.fn()}
				onCancel={jest.fn()}
			/>
		);
		expect(container).toBeEmptyDOMElement();
	});

	it("Should call onConfirm when confirm button is clicked", () => {
		const onConfirmMock = jest.fn();
		render(
			<Modal
				isOpen={true}
				action="Deletar"
				onConfirm={onConfirmMock}
				onCancel={jest.fn()}
			/>
		);
		fireEvent.click(screen.getByText("Confirmar"));
		expect(onConfirmMock).toHaveBeenCalledTimes(1);
	});

	it("Should call onCancel when cancel button is clicked", () => {
		const onCancelMock = jest.fn();
		render(
			<Modal
				isOpen={true}
				action="Deletar"
				onConfirm={jest.fn()}
				onCancel={onCancelMock}
			/>
		);
		fireEvent.click(screen.getByText("Cancelar"));
		expect(onCancelMock).toHaveBeenCalledTimes(1);
	});
});
