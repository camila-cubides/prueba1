Feature: Crear un nuevo sitio en Ghost CMS

@user16 @web
Scenario: Crear un sitio exitosamente
  Given I navigate to page "http://localhost:2368/ghost/#/setup"
  And I wait for 2 seconds
  When I enter text "<SITE_TITLE>" into the input with id "blog-title"
  And I enter text "<FULL_NAME>" into the input with id "name"
  And I enter text "<EMAIL>" into the input with id "email"
  And I enter text "<PASSWORD>" into the input with id "password"
  And I click on the element with data-test-button "setup"
  Then I wait for url containing "/ghost/#/dashboard" for 10 seconds
  And I should see the Ghost dashboard
