Feature: Login
  In order to login, the user needs valid email, password, and click the sign in button

  Scenario: Unsuccessful login
    Given a user has an account, with wrong password or email
    Then the user should see an log in error message