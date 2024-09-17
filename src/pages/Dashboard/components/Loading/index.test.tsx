import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading", () => {
	it("Should render Loading without crashing", () => {
		render(<Loading />);
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("Should display Spinner", () => {
		render(<Loading />);
		expect(screen.getByRole("progressbar")).toBeInTheDocument();
	});
});
