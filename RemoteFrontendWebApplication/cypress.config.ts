import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		specPattern: "cypress/e2e/**/*.cy.ts",
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: "http://localhost:4201",
	},

	component: {
		specPattern: "cypress/component/**/*.cy.ts",
		devServer: {
			framework: "angular",
			bundler: "webpack",
		},
	},
});
