const chalk = require("chalk");
const log = console.log;
const mock = require("./_mock.js");
let library = {
  local: "../graphql-query-factory/dist/index.js",
  remote: "graphql-query-factory"
};
log(`local: ${library.local}`);
const {
  builder,
  batcher,
  factory
} = require("../graphql-query-factory/dist/index.js");

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
let responseSolo = batcher.request(mock.singleQuery);
log(responseSolo);
////////////////////////////////////////////////////////
log(
  `\n------------------------------\n
    ${chalk.green("Batcher (multiple)")}
  \n------------------------------\n}`
);

let responseMultiple = batcher.batch(mock.batchQuery);
log(responseMultiple);

log(
  `\n------------------------------\n
    ${chalk.green("Factory")}
  \n------------------------------\n}`
);
let responseFactory = factory(mock.template, mock.variables);
log(responseFactory);
