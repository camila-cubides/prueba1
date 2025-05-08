Feature: Login Successful 

@user1 @web 
Scenario: Ghost Login Scenery 

  Given I navigate to page "<URL>" and path "/signin" 
  And I wait for 4 seconds 
  When I enter the email "<EMAIL>" 
  And I wait for 2 seconds 
  And I enter the password "<PASSWORD>" 
  And I wait for 2 seconds 
  And I click next 
  And I wait for 4 seconds 
  Then I logout 
  And I wait for 2 seconds 