export const givenIAmAt = (url: string): void => {
  cy.visit(url);
};

export const iCanSeeTheText = (text: string): void => {
  cy.contains(text);
};

export const iCanNotSeeTheText = (text: string): void => {
  cy.contains(text).should("not.exist");
};

export const givenIHaveClickedTheButtonContaining = (text: string): void => {
  cy.get("button").contains(text).click();
};

export const givenIHaveClickedTheTabContaining = (text: string): void => {
  givenIHaveClickedTheButtonContaining(text);
};
