import Test from "./Test.vue";
import { mount } from "cypress/vue2";

describe("<Test />", () => {
  it("Test1: when button is clicked, should call onClick (standard mount: WORKS)", () => {
    const onClickSpy = cy.spy().as("onClickSpy");

    // Use standard command `mount`
    mount(Test, {
      listeners: { click: onClickSpy },
    });

    // Trigger emit event
    cy.get("button").contains("Click Me").click();

    // Assert event using  Cypress.vue.$on
    cy.then(() => {
      Cypress.vue.$on("click", onClickSpy);
      expect(onClickSpy).to.be.calledOnce;
    });

    // Assert event using spies
    cy.get("@onClickSpy").should("have.been.calledOnce");

    // Assert event using listener from vue-test-utils
    cy.vue().then((wrapper) => {
      expect(wrapper.emitted("click")).to.have.length(1);
    });
  });

  it("Test2: when button is clicked, should call onClick (custom mount: NOT WORKS)", () => {
    const onClickSpy = cy.spy().as("onClickSpy");

    // Use custom command `mount`
    cy.mount(Test, {
      listeners: { click: onClickSpy },
    });

    // Trigger emit event
    cy.get("button").contains("Click Me").click().then(() => {
      expect(onClickSpy).to.be.calledOnce;
    });
  });
});
