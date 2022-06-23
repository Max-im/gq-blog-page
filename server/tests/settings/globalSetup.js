require('@babel/register');
require('@babel/polyfill/noConflict');
const http = require('http');
// const request = require("supertest");

const express = require('express');
const server = require('../../src/server');

module.exports = async () => {
    const app = express();
    app.use('/graphql', server);

    global.httpServer = app.listen(4002);
}