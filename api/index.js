const express = require('express');
const apiRouter = express.Router();

const authRouter = require('./auth/auth');
const userRouter = require('./user/userRouter');

apiRouter.use('/auth/',authRouter);
apiRouter.use('/users/', userRouter);

module.exports = apiRouter;