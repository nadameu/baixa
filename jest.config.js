module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

	moduleNameMapper: {
		'\\.css$': '<rootDir>/src/mock.css.js',
	},
};
