/// <reference types="cypress" />
import authenicated from "../../api/auth/authenicated"
import stockPositions from "../../api/stock/stockPositions"

describe('test functionallity of previous position form', () => {
    beforeEach(() => {
        authenicated()
        stockPositions()
        cy.visit('/')
        cy.contains('Stock').click()
        cy.contains('Previous').click()
    })

    it('should handle normal input of startDate and endDate', () => {
        cy.intercept('POST', '/api/stockpositions', { statusCode: 204 }).as('stockPositionsPost')
        cy.contains('Find Previous Positions').click()

        cy.contains('Start Date').click({ force: true })
        cy.wait(500)
        cy.get('span.MuiIconButton-label > p').eq(9).click()
        cy.get('.MuiButton-label').contains('OK').click()

        cy.contains('End Date').click({ force: true })
        cy.wait(500)
        cy.get('span.MuiIconButton-label > p').eq(20).click()
        cy.get('.MuiButton-label').contains('OK').click()

        cy.contains('Submit').click({ force: true })
        cy.contains('Success')

        cy.wait('@stockPositionsPost').its('request.body.startDate').should('not.be.undefined')
        cy.get('@stockPositionsPost').its('request.body.endDate').should('not.be.undefined')
    })

    it('should not allow missing dates', () => {
        cy.contains('Find Previous Positions').click()
        cy.contains('Submit').click({ force: true })
        cy.contains('This field is required.')

        cy.contains('Start Date').click({ force: true })
        cy.wait(500)
        cy.get('span.MuiIconButton-label > p').eq(9).click()
        cy.get('.MuiButton-label').contains('OK').click()

        cy.contains('Submit').click({ force: true })
        cy.contains('This field is required.')
    })

    it('should not allow the start date to be greater than end date', () => {
        cy.contains('Find Previous Positions').click()

        cy.contains('Start Date').click({ force: true })
        cy.wait(500)
        cy.get('span.MuiIconButton-label > p').eq(20).click()
        cy.get('.MuiButton-label').contains('OK').click()

        cy.contains('End Date').click({ force: true })
        cy.wait(500)
        cy.get('span.MuiIconButton-label > p').eq(9).click()
        cy.get('.MuiButton-label').contains('OK').click()

        cy.contains('Submit').click({ force: true })

        cy.contains('The date must be before the end date')
        cy.contains('The date must be after the start date')
    })

    it('should properly display status code and error message from api response', () => {
        const errorMessage = 'Problem saving stock date'
        cy.intercept('POST', '/api/stockpositions', { statusCode: 500, body: { errorMessage } }).as('stockPositionsPost')
        cy.contains('Find Previous Positions').click()

        cy.contains('Start Date').click({ force: true })
        cy.wait(500)
        cy.get('span.MuiIconButton-label > p').eq(9).click()
        cy.get('.MuiButton-label').contains('OK').click()

        cy.contains('End Date').click({ force: true })
        cy.wait(500)
        cy.get('span.MuiIconButton-label > p').eq(20).click()
        cy.get('.MuiButton-label').contains('OK').click()

        cy.contains('Submit').click({ force: true })

        cy.contains('(500)')
        cy.contains(errorMessage)
    })
})