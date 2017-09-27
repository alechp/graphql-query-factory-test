const chalk = require("chalk");
const log = console.log;
const mock = require("./_mock.js");
let library = {
  local: "../graphql-query-factory/dist/index.js",
  remote: "graphql-query-factory"
};
log(
  `${chalk.blue(
    "Environment: " +
      library.local +
      "\n---------------------------------------------------\n"
  )}`
);
const { builder, batcher, factory } = require(library.remote);

// `\n------------------------------\n
//   ${chalk.green("Builder")}
// \n------------------------------\n}`
let queries = builder(mock.template, mock.variables);
log(`builder(mock.template, mock.variables): ${queries}`);
////////////////////////////////////////////////////////
// `\n------------------------------\n
//   ${chalk.green("Batcher (single)")}
// \n------------------------------\n}`
batcher
  .request(mock.singleQuery)
  .then(data =>
    log(`batcher.request(mock.singleQuery): ${JSON.stringify(data, null, 4)}`)
  )
  .catch(err => log(`batcher.request(mock.singleQuery): ${err}`));

////////////////////////////////////////////////////////
// `\n------------------------------\n
//   ${chalk.green("Batcher (multiple)")}
// \n------------------------------\n}`
//
batcher
  .batch(mock.batchQuery)
  .then(data =>
    log(`batcher.batch(mock.batchQuery): ${JSON.stringify(data, null, 4)}`)
  )
  .catch(err => log(`batcher.batch(mock.batchQuery): ${err}`));

// `\n------------------------------\n
//   ${chalk.green("Factory")}
// \n------------------------------\n}`
factory(mock.template, mock.variables)
  .then(data =>
    log(
      `factory(mock.template, mock.variables): ${JSON.stringify(data, null, 4)}`
    )
  )
  .catch(err => log(`factory(mock.template, mock.variables): ${err}`));
