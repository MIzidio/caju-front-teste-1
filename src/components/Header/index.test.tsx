import { Header } from ".";
import { render, screen } from "@testing-library/react";

describe("Header", () => {
	it("Should render Header component", () => {
		render(
			<Header>
				<h1>Header Title</h1>
			</Header>
		);
		expect(screen.getByRole("banner")).toBeInTheDocument();
	});

	it("Should apply correct styles to Header component", () => {
		render(
			<Header>
				<h1>Header Title</h1>
			</Header>
		);
		const header = screen.getByRole("banner");
		expect(header).toHaveStyle(`
            background: linear-gradient(
                258deg,
                rgba(255, 117, 0, 1) 8%,
                rgba(232, 5, 55, 1) 53%
            );
            width: 100%;
            height: 64px;
            position: fixed;
            top: 0;
            display: flex;
            align-items: center;
            padding: 0px 24px;
        `);
	});

	it("Should contain an h1 element with correct text", () => {
		render(
			<Header>
				<h1>Header Title</h1>
			</Header>
		);
		const heading = screen.getByRole("heading", { name: /header title/i });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveStyle("color: #fff; font-size: 24px;");
	});
});
