export default function stockPositions() {
    cy.intercept('GET', '/api/stockpositions', {fixture: 'previousStockPositions'})
}