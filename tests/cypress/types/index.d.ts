/**
 * Copyright 2025 GDG on Campus Farmingdale State College
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to scroll to a specific section by its name
     * @example cy.scrollToSection('About')
     */
    scrollToSection(sectionName: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to check if an element exists
     * @example cy.assertElementExists('.header')
     */
    assertElementExists(selector: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to check visibility of multiple elements
     * @example cy.assertAllVisible(['.header', '.footer'])
     */
    assertAllVisible(selectors: string[]): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to log page title
     * @example cy.logPageTitle()
     */
    logPageTitle(): Chainable<string>;

    /**
     * Custom command to check accessibility attributes of a section
     * @example cy.checkSectionA11y('main')
     */
    checkSectionA11y(sectionSelector: string): Chainable<JQuery<HTMLElement>>;
  }
}
