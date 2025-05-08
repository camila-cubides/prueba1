Feature: Crear un nuevo sitio en Ghost CMS

  @user14 @web @createSiteNameError
 Scenario: Crear un sitio sin nombre muestra mensaje de error
    Given I navigate to page "http://localhost:3001/ghost/#/setup"
    And I wait for 2 seconds
    # dejamos el título vacío
    When I enter text "<EMPTY>" into the input with id "blog-title"
    And I enter text "<FULL_NAME>" into the input with id "name"
    And I enter text "<EMAIL>" into the input with id "email"
    And I enter text "<PASSWORD>" into the input with id "password"
    And I click on the element with data-test-button "setup"
    Then I should see text "Please enter a site title." in the element with selector ".response"
