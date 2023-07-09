describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Bekzat Ongdassynov',
      username: 'ohbekzat',
      password: 'ohbekzat'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.get('#username')
    cy.contains('password')
    cy.get('#password')
    cy.contains('button','Log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ohbekzat')
      cy.get('#password').type('ohbekzat')
      cy.get('#login-button').click()
      cy.contains('Log out')

      cy.contains('Bekzat Ongdassynov logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('ohbekzat')
      cy.get('#password').type('ohbekzat')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Cypress is great')
      cy.get('#author').type('Mlukkai')
      cy.get('#url').type('fullstackopen.com/en/part5')
      cy.contains('Hide')
      cy.get('#blog-button').click()
      cy.contains('Cypress is great')
      cy.contains('Mlukkai')
      cy.contains('Show')
      cy.contains('A new blog Cypress is great Mlukkai added')
    })

    describe('When blog is created', function() {
      beforeEach(function() {
        cy.contains('New blog').click()
        cy.get('#title').type('Cypress is great')
        cy.get('#author').type('Mlukkai')
        cy.get('#url').type('fullstackopen.com/en/part5')
        cy.get('#blog-button').click()
        cy.get('#show-button').click()
      })

      it('user can like a blog', function() {
        cy.contains('Likes: 0')
        cy.get('#like-button').click()
        cy.contains('Likes: 1')
      })

      it('user-owner can delete a blog', function() {
        cy.get('#remove-button').click()
        cy.get('html').should('not.contain', 'fullstackopen.com/en/part5')
      })

      it.only('only the author can remove the blog', function() {
        cy.get('#logout-button').click()
        const user = {
          name: 'Bekzat Ongdassynov',
          username: 'ohbekzat2',
          password: 'ohbekzat2'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
        cy.get('#username').type('ohbekzat2')
        cy.get('#password').type('ohbekzat2')
        cy.get('#login-button').click()
        cy.get('#show-button').click()
        cy.contains('#remove-button').should('not.exist')
      })

    })

    it('blogs are ordered by likes descending', function() {
      // ...
    })
  })
})