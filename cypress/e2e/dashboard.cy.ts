describe("App E2E Tests", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3001/");
	});

	it("should load the initial page correctly", () => {
		cy.contains("h1", "Caju Front Teste").should("be.visible");
	});
});
