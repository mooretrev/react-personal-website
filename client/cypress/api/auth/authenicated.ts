export default function authenicated() {
    cy.intercept('/api/auth/authenicated', {
        authenicated: true
    })
}