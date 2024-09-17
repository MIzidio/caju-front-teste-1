describe("NewUserPage E2E Tests", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3001/#/new-user");
	});

	it("allows to add new registrations", () => {
		cy.get("[data-test='employeeName-input']").type("John Doe");
		cy.get("[data-test='email-input']").type("john@email.com");
		cy.get("[data-test='cpf-input']").type("12345678909");
		cy.get("[data-test='admissionDate-input']").type("2024-09-17");
		cy.get("[data-test='submit-button']").click();
		cy.get("[data-test='success-notification']").should("exist");
	});

	it("shows an error message when the form is invalid", () => {
		cy.get("[data-test='employeeName-input']").type("J");
		cy.get("[data-test='email-input']").type("johnemail.com");
		cy.get("[data-test='cpf-input']").type("12345678909");
		cy.get("[data-test='admissionDate-input']").type("2024-09-17");
		cy.get("[data-test='submit-button']").click();
		cy.get("[data-test='employeeName-error']").should("exist");
		cy.get("[data-test='email-error']").should("exist");
	});
});
