describe('Navigation Flow', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('should load landing page', () => {
      cy.url().should('eq', Cypress.config().baseUrl + '/')
      cy.get('[data-test="landing-page"]').should('be.visible')
      cy.get('[data-test="landing-section"]').should('be.visible')
    })
  
    it('should navigate through sections', () => {
        // About page
        cy.get('[data-test="nav-about"]').click()
        cy.url().should('include', '/about')
        cy.get('[data-test="about-section"]').should('exist')
    
        // Portfolio page
        // Wait for nav to be visible
        //cy.get('[data-test="nav-portfolio"]').should('be.visible').click();
        // Verify URL change
        //cy.url().should('include', '/portfolio');
        // Verify portfolio section is visible
        //cy.get('[data-test="portfolio-section"]', { timeout: 10000 }).should('be.visible');
    
        // Navigate to Contact
        //cy.get('[data-test="nav-contact"]').click()
        //cy.url().should('include', '/contact')
        //cy.get('[data-test="contact-section"]').should('be.visible')
        //cy.get('h1').should('contain', 'CONTACTS')
      })
  
    it('should return to landing page', () => {
      cy.get('.dp-logo').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })