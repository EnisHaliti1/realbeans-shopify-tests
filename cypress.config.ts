// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });


import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "hg8yo2", // ← your project ID from Cypress Cloud

  e2e: {
    baseUrl: "https://r0955040-realbeans.myshopify.com", // ← your Shopify dev store
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

