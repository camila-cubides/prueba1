Feature: Validaciones de login usando Page Object

@user20 @web
Scenario Outline: Intento de login con campo faltante
  Given I go to page "<URL>" and path "/signin"
  And I wait for 2 seconds
  When I sign in without email and "<PASSWORD>"
  Then I should see error message "Please fill out the form to sign in."
