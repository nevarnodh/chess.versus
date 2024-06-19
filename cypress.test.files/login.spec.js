describe('Login', () => {
  it('should display login form', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

  it('should login a user', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/profile');
    cy.get('h1').should('contain', 'Welcome, testuser');
  });

  it('should show an error for invalid credentials', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.error-message').should('contain', 'Invalid email or password');
  });
});

