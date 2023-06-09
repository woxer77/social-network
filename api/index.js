const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socket = require('socket.io');

const { join } = require('path');
const config = require('./src/configs/config');
const db = require('./src/configs/db');
const errorMiddleware = require('./src/middlewares/error-middleware');

const usersRouter = require('./src/routes/users');
const postsRouter = require('./src/routes/posts');
const commentsRouter = require('./src/routes/comments');
const messagesRouter = require('./src/routes/messages');
const likedUserPostRouter = require('./src/routes/liked-user-post');
const registrationRouter = require('./src/routes/registration');
const loginRouter = require('./src/routes/login');
const logoutRouter = require('./src/routes/logout');
const emailActivationRouter = require('./src/routes/email-activation');
const refreshRouter = require('./src/routes/refresh');
const uploadRouter = require('./src/routes/upload');

const app = express();

app.use(cors({
  credentials: true,
  origin: config.clientUrl,
  preflightContinue: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/images', express.static(join(__dirname, 'src/assets/images')));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/messages', messagesRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/email-activation', emailActivationRouter);
app.use('/refresh', refreshRouter);
app.use('/upload', uploadRouter);

app.use('/liked-user-post', likedUserPostRouter);

app.use(errorMiddleware);

/* eslint-disable no-shadow, camelcase */

db.raw('SELECT 1')
  .then(() => {
    console.log('PostgreSQL connected');
  })
  .catch((e) => {
    console.log('PostgreSQL not connected');
    console.error(e);
  });

const server = app.listen(config.appPort, () => console.log(`server started at ${config.appPort}`));

const io = socket(server, {
  cors: {
    credentials: true,
    origin: config.clientUrl,
    preflightContinue: false
  }
});

const users = {};
io.on('connection', (socket) => {
  // When a user connects
  socket.on('userConnected', (userId) => {
    users[userId] = socket.id;
  });

  // When a user sends a message
  socket.on('sendMessage', ({ message_id, users: usersProp, text }) => {
    const senderId = usersProp[0];
    const receiverId = usersProp[1];

    if (senderId !== socket.id) {
      // If the sender is not the current user, don't broadcast the message
      return;
    }

    const receiverSocketId = users[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', { message_id, users: usersProp, text });
    }
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    const userId = Object.keys(users).find((key) => users[key] === socket.id);
    delete users[userId];
  });
});
