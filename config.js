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
  },
  theme: './theme.less',
  // envs: {
  //   API: 'http://localhost',
  // },  
};
