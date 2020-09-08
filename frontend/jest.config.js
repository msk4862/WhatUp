module.exports = {
    displayName: 'WhatUp',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.css$': require.resolve('./test/style-mock.js')
    },
    collectCoverageFrom: ['**/src/**/*.{js,jsx}'],
}