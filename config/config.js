const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'web'
    },
    port: process.env.PORT || 3000,
    db: "mongodb+srv://admin:123@chuong.ggcwk.mongodb.net/finalweb?retryWrites=true&w=majority"
  },

  production: {
    root: rootPath,
    app: {
      name: 'web'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb+srv://admin:123@chuong.ggcwk.mongodb.net/finalweb?retryWrites=true&w=majority'
  }
};

module.exports = config[env];
