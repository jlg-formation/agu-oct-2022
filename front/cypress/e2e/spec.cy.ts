describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('Gérer efficacement votre stock !');
    cy.get('button').contains('Voir le stock').click();
    cy.contains('Liste des articles');
    cy.location('href').should('contain', '/stock');
    cy.get('button[title="Ajouter"]').click();
  });
});
