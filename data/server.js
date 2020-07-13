const express = require('express');

const postRouter = require('./posts/postRouter');
// const commentsRouter = require('./comments/commentsRouter');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);
// server.use('/api/posts/:id/comments', commentsRouter);

module.exports = server;