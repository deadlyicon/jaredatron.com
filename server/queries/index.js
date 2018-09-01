'use strict';

const requireAll = require('require-all');

const queries = requireAll({
  dirname: __dirname,
  filter: /(.+Query)\.js$/,
});

Object.entries(queries).forEach(([key, query]) => {
  const name = key.replace(/Query$/,'');
  module.exports[name] = function({ logger, ...args }){
    logger = logger.prefix(`Query:${name}`);
    return query({ logger, ...args }).catch(error => {
      logger.error(error);
      throw error;
    });
  };
});

module.exports.executeQuery = async function(type, payload) {

}
