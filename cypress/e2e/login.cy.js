describe('Login page spec', () => {
  const correctEmail = 'webtester@gmail.com'
  const correctPassword = 'test123'
  const wrongEmail = `${+new Date()}@gmail.com`
  const wrongPassword = +new Date()

  beforeEach(() => {
    cy.visit('http://localhost:5173/user/login')
  })

  it('Should display warnings if inputs are empty', () => {
    /* SCENARIO
        - Submit when no input has been typed
        - Assert to see if the warning and the message is visible
    */

    cy.get('button[type="submit"]').click()
    cy.contains('.warning', 'Please fill all the required fields').should('be.visible')
  })

  it('Should display warning if either email or password are incorrect', () => {
    /* SCENARIO
        - Submit form with wrong email but correct password
        - Assert to see if the warning and the error message is visible
        - Submit form with correct email but wrong password
        - Assert to see if the warning and the error message is visible
    */

    // Invalid email, valid password
    cy.get('input#email').type(wrongEmail).should('have.value', wrongEmail)
    cy.get('input#password').type(correctPassword).should('have.value', correctPassword)
    cy.get('button[type="submit"]').click()
    cy.contains('.warning', 'email or password is wrong').should('be.visible')

    // Valid email, invallid password
    cy.get('input#email').clear().type(correctEmail).should('have.value', correctEmail)
    cy.get('input#password').clear().type(wrongPassword).should('have.value', wrongPassword)
    cy.get('button[type="submit"]').click()
    cy.contains('.warning', 'email or password is wrong').should('be.visible')
  })

  it('Should retrieve the user data with the token if login is success', () => {
    /* SCENARIO
        - Submit form with both correct email and password
        - Assert the url to see if the url move to user page
        - Assert the avatar, id, name, and email to see if they get the correct data (if they get the data, that means the login is successful and the valid token is retrieved)
    */

    // Submission
    cy.get('input#email').type(correctEmail).should('have.value', correctEmail)
    cy.get('input#password').type(correctPassword).should('have.value', correctPassword)
    cy.get('button[type="submit"]').click()

    // Check if the user data has been retrieved the token
    cy.url().should('include', '/user')

    cy.get('#me-avatar')
      .should('have.attr', 'src', 'https://ui-avatars.com/api/?name=Tester&background=random')
      .and('have.attr', 'alt', 'User avatar')
    cy.get('#me-id').should('have.text', 'user-p2Jd_YVkQuePyDd5')
    cy.get('#me-name').should('have.text', 'Tester')
    cy.get('#me-email').should('have.text', 'webtester@gmail.com')
  })
})
