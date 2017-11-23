var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://vishnevskys-2:8081"',
  CLIENT_ID: '"27SWqPeKuUfca8sdmhywNLGmHDYjlTmL"',
  AUTH_DOMAIN: '"vishnevsky.eu.auth0.com"'
});