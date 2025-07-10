describe("BooksApp autotests", () => {
  it("Успешный вход в систему", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");

    cy.contains("Добро пожаловать test@test.com").should("be.visible");
    cy.contains("Log out").should("be.visible");
  });

  it("Вход в систему c невалидным логином", () => {
    cy.visit("/");
    cy.login(" ", "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
  it("Вход в систему с невалидным паролем", () => {
    cy.visit("/");
    cy.login("fghhhm", " ");

    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
});

describe("Тест добавление книги", () => {
  it("Отображение стартовой страницы", () => {
    cy.visit("/");
    cy.get("body").should("be.visible");
  });

  it("Отсутствие книг в избранном", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.contains("Favorites").click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible");
  });

  it("Добавление новой книги в избранное", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.addNewBookInFavorites("Вий", "Триллер", "Гоголь Н.В.");
    cy.contains("Favorites").click();
    cy.contains("Вий").should("be.visible");
    cy.contains("Гоголь Н.В.").should("be.visible");
  });

  it("Удаление книги из избранного", () => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.addNewBookInFavorites("Вий", "Триллер", "Гоголь Н.В.");
    cy.contains("Favorites").click();
    cy.contains("Delete from favorite").should("be.visible").click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible");
  });
});