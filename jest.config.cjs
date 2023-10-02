/* eslint-disable no-undef */
module.exports = {
	roots: ['<rootDir>'],
	testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	moduleNameMapper: {
		'^@dist/(.*)$': '<rootDir>/dist/cjs/$1'
	}
};
