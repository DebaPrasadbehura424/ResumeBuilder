describe("Resume Builder UI Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should navigate to login page and check URL", () => {
    cy.get("a").contains("Login").click();
    cy.url().should("include", "/login");

    cy.get('input[placeholder="EMAIL"]').should("exist");
    cy.get('input[placeholder="PASSWORD"]').should("exist");
  });

  it("should have Contact Us button on homepage", () => {
    cy.get("a")
      .contains("Contact Us")
      .should("exist")
      .and("have.attr", "href")
      .and("include", "/contact");
  });
});
