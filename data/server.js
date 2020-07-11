const express = require('express');

const postRouter = require('./posts/postRouter');
const messageRouter = require('./messages/messageRouter');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);
server.use('/api/posts/:id/comments', messageRouter);

module.exports = server;