const path = require('path');

module.exports = (env) => {
  const mode = env.mode || 'dev';
  return require(`./webpack.${mode}.js`);
};