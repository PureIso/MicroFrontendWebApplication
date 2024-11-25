module.exports = {
	preset: 'jest-preset-angular',
	// Path to the setup file
	setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
	// Enable detailed test results in the console
	verbose: true,
	collectCoverageFrom: [
		"./src/app/**/*.component.ts*",
		"./src/app/**/*.service.ts*"
	],
	// Ignore specific paths during testing
	testPathIgnorePatterns: [
		'/node_modules/',
		'<rootDir>/dist/',
		'<rootDir>/coverage/',
		'<rootDir>/src/.*\\.html$',
		'<rootDir>/src/.*\\.module\\.ts$',
		'<rootDir>/src/setup-jest\\.ts$',
	],
	testEnvironment: 'jsdom',
};