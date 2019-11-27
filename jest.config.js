module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	collectCoverage: true,
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	transform: { '\\.[jt]sx?$': ['ts-jest'] },
	moduleNameMapper: {
		'\\.css$': '<rootDir>/src/mock.css.js',
	},
};
