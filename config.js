const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  webpack: {
    output: {
      publicPath: './',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        Loading: path.resolve(__dirname, './src/components/loading'),
        api: path.resolve(__dirname, './src/api'),
        assets: path.resolve(__dirname, './src/assets'),
        components: path.resolve(__dirname, './src/components'),
        pages: path.resolve(__dirname, './src/pages'),
        stores: path.resolve(__dirname, './src/stores'),
        nomatch: path.resolve(__dirname, './src/components/error-pages/404.jsx'),
        'choerodon-front-boot': path.resolve(__dirname, './src/utils/index.js'),
      },
    },
    devServer: {
      open: true,
      port: 3030,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'SAAS',
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          removeComments: true,
          removeTagWhitespace: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
        },
        // hash: true,
        // excludeChunks:['contact'],
        // chunks: ['manifest', 'vendor', 'app'],
        // chunks:['vendor','app'],
        favicon: path.resolve(__dirname, './template/favicon.ico'),
        template: path.resolve(__dirname, './template/index.ejs'), // Load a custom template (ejs by default see the FAQ for details)
      }),
    ],
  },
  theme: './theme.less',
  // envs: {
  //   API: 'http://localhost',
  // },  
};
