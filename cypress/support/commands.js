// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { mount } from "cypress/vue2";
import Vue from 'vue'
import { VApp } from 'vuetify/lib/components/VApp'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

// Override default command mount to use it with Vuetify
Cypress.Commands.add("mount", (component, args = {}) => {
  const { listeners, ...props } = args

  // pass event handlers to child component via `on` prop
  const on = Object.entries(listeners || {}).reduce((acc, [event, handler]) => {
    acc[event] = handler
    return acc
  }, {})

  return mount({
    vuetify: new Vuetify({}),
    render: h => h(
      VApp, [
        h(component, { ...props, on })
      ]
    )
  })
})

// Also add a command to use easily vue-test-utils as describe by Jessica Sachs
// https://github.com/JessicaSachs/cypress-loves-vite/blob/develop/cypress/support/index.js#L19
Cypress.Commands.add("vue", () => {
  return cy.wrap(Cypress.vueWrapper);
});
