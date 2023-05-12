const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./src/configs/config');
const db = require('./src/configs/db');
const errorMiddleware = require('./src/middlewares/error-middleware');

const usersRouter = require('./src/routes/users');
const postsRouter = require('./src/routes/posts');
const likedUserPostRouter = require('./src/routes/liked-user-post');
const registrationRouter = require('./src/routes/registration');
const loginRouter = require('./src/routes/login');
const logoutRouter = require('./src/routes/logout');
const emailActivationRouter = require('./src/routes/email-activation');
const refreshRouter = require('./src/routes/refresh');

const app = express();

app.use(cors({
  credentials: true,
  origin: config.clientUrl,
  preflightContinue: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/email-activation', emailActivationRouter);
app.use('/refresh', refreshRouter);

app.use('/liked-user-post', likedUserPostRouter);

app.use(errorMiddleware);

db.raw('SELECT 1')
  .then(() => {
    console.log('PostgreSQL connected');
  })
  .catch((e) => {
    console.log('PostgreSQL not connected');
    console.error(e);
  });

app.listen(config.appPort, () => console.log(`server started at ${config.appPort}`));
