/* eslint-disable no-unused-vars */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const log = require('./src/utils/logger');
const schema = require('./src/schema/schema');
const { graphqlHTTP } = require('express-graphql');
const { API_PORT } = process.env;

const app = express();

app.use(cors({ origin: '*' }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api', graphqlHTTP({ schema, graphiql: true }));

app.listen(API_PORT, () => {
    log.info('==========================================================================');
    log.info(`iHelp GraphQL service is running | MODE: ${process.env.NODE_ENV} | PORT: ${API_PORT}`);
    log.info('==========================================================================');
});

process.on('unhandledRejection', (ex) => {
    log.error(ex.message.red.bold);
});
