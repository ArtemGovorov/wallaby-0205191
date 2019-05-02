module.exports = function(api) {
    const isProd = api.env('production');
    const isTest = api.env('test');

    const isWebpack = api.caller((caller) => {
        return caller && caller.name === 'babel-loader';
    });

    const isNode = isTest || !isWebpack;

    const presets = [
        [
            '@babel/preset-env',
            isNode
                ? {
                    modules: 'commonjs',
                    targets: {
                        node: 'current',
                    },
                }
                : {
                    modules: false,
                    useBuiltIns: 'entry',
                    corejs: 3,
                    targets: {
                        browsers: ['ie >= 11'],
                    },
                },
        ],
        '@babel/preset-react',
        '@babel/preset-flow',
    ];

    const plugins = [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-export-namespace-from',
    ];

    if (isProd) {
        plugins.push('@babel/plugin-transform-react-inline-elements');
        plugins.push('transform-react-remove-prop-types');
    } else {
        plugins.push('babel-plugin-styled-components');
    }

    return {
        presets,
        plugins,
    };
};
