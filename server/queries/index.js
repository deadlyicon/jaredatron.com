'use strict';

const requireAll = require('require-all');

const queryFilenames = requireAll({
  dirname: __dirname,
  filter: /(.+Query)\.js$/,
});

const queries = {}

Object.entries(queryFilenames).forEach(([queryFilename, query]) => {
  const queryName = queryFilename.replace(/Query$/,'');
  queries[queryName] = function({ logger, ...args }){
    logger = logger.prefix(`Query:${queryName}`);
    return query({ logger, ...args }).catch(error => {
      logger.error(error);
      throw error;
    });
  };
});

const executeQuery = async function({ logger, queryName, options }) {
  if (!(queryName in queries))
    throw new Error(`query ${queryName} is not found`)
  return await queries[queryName]({ logger, ...options })
}

module.exports  = {
  executeQuery,
  ...queries,
}
