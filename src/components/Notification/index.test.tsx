import Notification from ".";
import { render, screen } from "@testing-library/react";

describe("Notification", () => {
	it("Should render with correct message and type", () => {
		const message = "Success message";
		const type = "success";
		render(<Notification message={message} type={type} onClose={jest.fn()} />);
		expect(screen.getByText(message)).toBeInTheDocument();
		expect(screen.getByText(message)).toHaveAttribute("type", type);
	});

	it("Should call onClose after 5 seconds", () => {
		jest.useFakeTimers();
		const handleClose = jest.fn();
		render(
			<Notification
				message="Test message"
				type="success"
				onClose={handleClose}
			/>
		);
		jest.advanceTimersByTime(5000);
		expect(handleClose).toHaveBeenCalledTimes(1);
		jest.useRealTimers();
	});

	it("Should not call onClose before 5 seconds", () => {
		jest.useFakeTimers();
		const handleClose = jest.fn();
		render(
			<Notification
				message="Test message"
				type="success"
				onClose={handleClose}
			/>
		);
		jest.advanceTimersByTime(4000);
		expect(handleClose).not.toHaveBeenCalled();
		jest.useRealTimers();
	});
});
