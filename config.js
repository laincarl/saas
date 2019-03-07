const path = require('path');

module.exports = {
  webpack: {
    resolve: {    
      alias: {
        Loading: path.resolve(__dirname, './src/components/loading'),
        api: path.resolve(__dirname, './src/api'),
        assets: path.resolve(__dirname, './src/assets'),
        components: path.resolve(__dirname, './src/components'),
        pages: path.resolve(__dirname, './src/pages'),
        stores: path.resolve(__dirname, './src/stores'),
      },
    },
    devServer: {
      open: true,
      port: 3030,
    },
  },
  // envs: {
  //   API: 'http://localhost',
  // },  
};
