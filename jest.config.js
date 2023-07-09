module.exports = {
    preset: 'ts-jest',
    silent: false,
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testMatch: ['**/src/**/*.test.ts'],
};

