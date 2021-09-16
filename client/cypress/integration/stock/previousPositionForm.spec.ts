/// <reference types="cypress" />

import authenicated from "../../api/auth/authenicated"
import stockPositions from "../../api/stock/stockPositions"

const exitDialog = () => {
    cy.get('body').trigger('keydown', { keyCode: 27});
    cy.wait(500);
    cy.get('body').trigger('keyup', { keyCode: 27});
}

describe('test functionallity of previous position form', () => {
    beforeEach(() => {
        authenicated()
        stockPositions()
        cy.visit('/')
        cy.contains('Stock').click()
        cy.contains('Previous').click()
    })
    it.only('should handle normal input of startDate and endDate', () => {
        cy.intercept('POST', '/api/stockpositions', {statusCode: 204}).as('stockPositionsPost')
        cy.contains('Find Previous Positions').click()
        cy.contains('Start Date').click({force: true})
        cy.get('.MuiPickersCalendar-week').contains('1').click()
        cy.wait(500);
        cy.get('.MuiPickersCalendar-transitionContainer').contains('1').click({force: true})

        cy.get('.MuiButton-label').contains('OK').click({force: true})
        cy.get('input[id="previous-position-form-end-date"]').type('2021-08-01', {force: true})
        cy.get('.MuiButton-label').contains('OK').click()
        cy.contains('Submit').click({force: true})
        cy.contains('Success')

        cy.wait('@stockPositionsPost').its('request.body.startDate').should('not.be.undefined')
        cy.get('@stockPositionsPost').its('request.body.endDate').should('not.be.undefined')
        exitDialog()
    })
    it('should not allow missing dates', () => {
        cy.contains('Find Previous Positions').click()
        cy.contains('Submit').click({force: true})

        cy.contains('This field is required.')
        cy.get('input[id="previous-position-form-start-date"]').type('2021-07-01', {force: true})
        cy.get('.MuiButton-label').contains('OK').click({force: true})

        cy.contains('Submit').click({force: true})
        cy.contains('This field is required.')
        exitDialog()
    })
    it('should not allow the start date to be greater than end date', () => {
        cy.contains('Find Previous Positions').click()
        cy.get('input[id="previous-position-form-start-date"]').type('2021-09-01', {force: true})
        cy.get('.MuiButton-label').contains('OK').click({force: true})
        cy.get('input[id="previous-position-form-end-date"]').type('2021-08-01', {force: true})
        cy.get('.MuiButton-label').contains('OK').click()
        cy.contains('Submit').click({force: true})
        cy.contains('The date must be before the end date')
        cy.contains('The date must be after the start date')
      
    })
    it('should properly display status code and error message from api response', () => {

    })
})