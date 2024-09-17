import TextField from "../TextField";
import { render, screen, fireEvent } from "@testing-library/react";

describe("TextField", () => {
	it("Should render TextField with label", () => {
		render(<TextField label="Username" id="username" />);
		expect(screen.getByLabelText("Username")).toBeInTheDocument();
	});

	it("Should render TextField with error message", () => {
		render(<TextField error="Required field" />);
		expect(screen.getByText("Required field")).toBeInTheDocument();
	});

	it("Should call onChange when input value changes", () => {
		const handleChange = jest.fn();
		render(<TextField onChange={handleChange} />);
		const input = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: "new value" } });
		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	it("Should apply props correctly to input element", () => {
		render(<TextField placeholder="Enter text" />);
		const input = screen.getByPlaceholderText("Enter text");
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("placeholder", "Enter text");
	});
});
