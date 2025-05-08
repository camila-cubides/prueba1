Feature: Login user

@user1 @web
Scenario: Login with incorrect password
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  When I enter the email "<EMAIL>"
  And I wait for 1 seconds
  And I enter the password "wrongpassword"
  And I wait for 2 seconds
  And I click next
  Then I should see an error message "Your password is incorrect."