describe("RealBeans Shopify Store", () => {
  const storeUrl = "https://r0955040-realbeans.myshopify.com/";
  const storefrontPassword = "sheiti";

  beforeEach(() => {
    cy.session("storefront-login", () => {
      cy.visit(storeUrl);

      cy.get("body").then(($body) => {
        if ($body.find('input[name="password"]').length) {
          cy.get('input[name="password"]').type(storefrontPassword);
          cy.get('button[type="submit"]').click();
          cy.url().should("include", storeUrl);
        }
      });
    });

    cy.visit(storeUrl);
  });

  afterEach(() => {
    cy.wait(4000);
  });


  // The product catalog page shows the correct items you entered.
  it("Catalog shows both added products", () => {
  cy.visit(`${storeUrl}/collections/all`);
  cy.get(".collection").should("contain.text", "Roasted coffee beans 5kg");
  cy.get(".collection").should("contain.text", "Blended coffee 5kg");
  });


  //  Sorting products (e.g., by price) actually changes their order.
  it("Filters products by price range correctly", () => {
  cy.visit(`${storeUrl}/collections/all`);

  cy.get(
    "#Details-filter\\.v\\.price-template--25027217555839__product-grid > .facets__summary"
  ).click();
  cy.get("#Filter-Price-GTE").clear().type("40");
  cy.get("#Filter-Price-LTE").clear().type("45");
  cy.get("#FacetFiltersForm").submit();
  cy.wait(4000);
  cy.get("#product-grid").should("contain.text", "Roasted coffee beans 5kg");
  cy.get("#product-grid").should("not.contain.text", "Blended coffee 5kg");
  });


  // Product detail pages display the right descriptions, prices, and imagenames.
  it("Displays correct details for both products", () => {
  const products = [
    {
      name: "Blended coffee 5kg",
      url: "blended-coffee-5kg",
      description: "RealBeans coffee, ready to brew.",
      price: "€55",
      imageName: "RealBeansBlendBag.png",
    },
    {
      name: "Roasted coffee beans 5kg",
      url: "roasted-coffee-beans-5kg",
      description: "Our best and sustainable real roasted beans.",
      price: "€40",
      imageName: "RealBeansRoastedBag.png",
    },
  ];

  products.forEach((product) => {
    cy.visit(`${storeUrl}/products/${product.url}`);

    cy.get(".product__description > p").should("contain.text", product.description);
    cy.get(".price__regular > .price-item").should("contain.text", product.price);
    cy.get("img").should("have.attr", "src").and("include", product.imageName);

    cy.wait(4000);
    });
  });


  // The homepage's intro text, and product list appear correctly.
  it("Displays homepage intro text and product list", () => {
  cy.visit(storeUrl);

  cy.get(".banner__heading, .banner__content, .banner__box")
    .contains(
      "Since 1801, RealBeans has roasted premium coffee in Antwerp for Europe’s finest cafes. Ethically sourced beans, crafted with care."
    )
    .should("be.visible");

  cy.contains("Roasted coffee beans 5kg");
  cy.contains("Blended coffee 5kg");
  cy.wait(4000);
  });


  // The About page includes the history paragraph.
  it("Displays correct About page content", () => {
  cy.visit(`${storeUrl}/pages/about`);
  cy.get(".page-width")
    .contains(
      "From a small Antwerp grocery to a European coffee staple, RealBeans honors tradition while innovating for the future."
    )
    .should("be.visible");
    cy.wait(4000);
  });
});

