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
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ohbekzat')
      cy.get('#password').type('ohbekzat')
      cy.get('#login-button').click()

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
      // log in user here
    })

    it('a blog can be created', function() {
      // ...
    })

    it('user can like a blog', function() {
      // ...
    })

    it('a blog can be removed', function() {
      // ...
    })

    it('only the author can remove the blog', function() {
      // ...
    })

    it('blogs are ordered by likes descending', function() {
      // ...
    })
  })
})