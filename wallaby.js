module.exports = function (wallaby) {
    return {
        files: [
            'projects/**/*.js',
            '!projects/investor-reports/**/*.test.js',
        ],

        tests: [
            'projects/investor-reports/**/*.test.js'
        ],

        env: {
            type: 'node'
        },

        compilers: {
            '**/*.js': wallaby.compilers.babel()
        },

        testFramework: 'jest'
    };
};
