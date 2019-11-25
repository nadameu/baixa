module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	transform: { '\\.[jt]sx?$': ['ts-jest'] },
	moduleNameMapper: {
		'\\.css$': '<rootDir>/src/mock.css.js',
	},
};
