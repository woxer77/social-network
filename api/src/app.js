const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./configs/config');
const db = require('./configs/db');
const errorMiddleware = require('./middlewares/error-middleware');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const likedUserPostRouter = require('./routes/liked-user-post');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const emailActivationRouter = require('./routes/email-activation');
const refreshRouter = require('./routes/refresh');

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
