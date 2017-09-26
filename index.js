const mock = require("./_mock.js");
let library = {
  local: "../graphql-query-factory/dist/index.js",
  remote: "graphql-query-factory"
}

const graphqlQueryFactory = require(library.local);
// const { builder, batcher, factory } = graphqlQueryFactory;
const builder = graphqlQueryFactory.builder;
const batcher = graphqlQueryFactory.batcher;
const factory = graphqlQueryFactory.factory;
const chalk = require("chalk");
const log = console.log;

log(
  `\n------------------------------\n
    ${chalk.green("Builder")}
  \n------------------------------\n}`
);
let queries = builder(mock.template, mock.variables);
log(queries);
////////////////////////////////////////////////////////
log(
  `\n------------------------------\n
    ${chalk.green("Batcher (single)")}
  \n------------------------------\n}`
);
let responseSolo = await batcher.request(mock.singleQuery);
log(responseSolo);
////////////////////////////////////////////////////////
log(
  `\n------------------------------\n
    ${chalk.green("Batcher (multiple)")}
  \n------------------------------\n}`
);

let responseMultiple = await batcher.batch(mock.batchQuery);
log(responseMultiple);

log(
  `\n------------------------------\n
    ${chalk.green("Factory")}
  \n------------------------------\n}`
);
let responseFactory = awawit factory(mock.template, mockvariables);
log(responseFactory);
}
