// const {
//   QueryBuilder,
//   builder,
//   QueryBatcher,
//   batcher
// } = require("../graphql-query-factory/dist/index.js");

const {
  QueryBuilder,
  builder,
  QueryBatcher,
  batcher
} = require("graphql-query-factory");

const chalk = require("chalk");
const log = console.log;

const mutationTemplate = `mutation {
  createContent(
    markup: $markup
    raw: $raw
  ) {
    markup
    raw
  }
}`;

const mutationVariables = [
  {
    markup: "markup1",
    raw: "raw1"
  },
  {
    markup: "markup2",
    raw: "raw2"
  },
  {
    markup: "markup3",
    raw: "raw3"
  }
];

function manMutationBuild() {
  const qbuilder = new QueryBuilder();
  qbuilder.setQuery(mutationTemplate);
  qbuilder.setVariables(mutationVariables);
  let queries = qbuilder.buildQueries();
  return queries;
}
function autoMutationBuild() {
  let queries = builder(mutationTemplate, mutationVariables);
  return queries;
}

//-----------------------------------
const manMutations = manMutationBuild();
const autoMutations = autoMutationBuild();

function manMutationExecES6() {
  //concurrency defaults to 4, so no need to specify if you want 4 concurrent requests
  const qbatcher = new QueryBatcher(manMutations, 4);
  qbatcher
    .queryBatchExecute()
    .then(queries => log(`Queries: ${queries}`))
    .catch(err => log(`manMutationExecES6: ${chalk.red(err)}`));
}
async function manMutationExecES7() {
  //maybe you want to use a global query batcher, in which case you can programmatically set mutations & concurrent connections
  const qbatcher = new QueryBatcher();
  qbatcher.setQueries(manMutations);
  qbatcher.setConcurrent(4);
  try {
    let queries = await qbatcher.queryBatchExecute();
  } catch (err) {
    log(`manMutationExecES7: ${chalk.red(err)}`);
  }
}
function autoMutationExecES6() {
  batcher(manMutations, 4)
    .then(res => log(`autoMutationExecES6: ${res}`))
    .catch(err => log(`autoMutationExecES6: ${err}`));
}
async function autoMutationExecES7() {
  try {
    log(await batcher(manMutations, 4));
  } catch (err) {
    log(`autoMutationExecES7: ${err}`);
  }
}
////////////////////////////////////////////////////
// BUILDER
////////////////////////////////////////////////////
log(`${chalk.yellow("\n manMutationBuild: \n")}`);
manMutationBuild();
log(`${chalk.yellow("\n autoMutationBuild: \n")}`);
autoMutationBuild();
////////////////////////////////////////////////////
//BATCHER
////////////////////////////////////////////////////
// log(`${chalk.yellow("\n manMutationExecES6: \n")}`);
manMutationExecES6();
// log(`${chalk.yellow("\n manMutationExecES7: \n")}`);
manMutationExecES7();
// log(`${chalk.yellow("\n autoMutationExecES6: \n")}`);
autoMutationExecES6();
// log(`${chalk.yellow("\n autoMutationExecES7: \n")}`);
autoMutationExecES7();
