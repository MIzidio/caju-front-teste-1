import Button, { ButtonSmall } from ".";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Button", () => {
	it("Should show button", () => {
		const { debug } = render(<Button>Ativar</Button>);
		expect(screen.getByRole("button", { name: /ativar/i }));
		debug();
	});

	it("Should call onClick when button is clicked", () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Ativar</Button>);
		const button = screen.getByRole("button", { name: /ativar/i });
		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("Should render ButtonSmall with correct text", () => {
		const { debug } = render(<ButtonSmall>Pequeno</ButtonSmall>);
		expect(screen.getByRole("button", { name: /pequeno/i }));
		debug();
	});

	it("Should apply bgcolor and color props correctly to ButtonSmall", () => {
		render(
			<ButtonSmall bgcolor="#ff0000" color="#00ff00">
				Pequeno
			</ButtonSmall>
		);
		const button = screen.getByRole("button", { name: /pequeno/i });
		expect(button).toHaveStyle("background-color: #ff0000");
		expect(button).toHaveStyle("color: #00ff00");
	});
});
