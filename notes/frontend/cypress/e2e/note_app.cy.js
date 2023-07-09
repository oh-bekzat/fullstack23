describe('Note ', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'ohbekzat3',
      username: 'ohbekzat3',
      password: 'ohbekzat3'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
    cy.get('#username').type('ohbekzat3')
    cy.get('#password').type('ohbekzat3')
    cy.get('#login-button').click()

    cy.contains('ohbekzat3 logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ohbekzat3', password: 'ohbekzat3' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('ohbekzat3')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'ohbekzat3 logged in')
  })
})