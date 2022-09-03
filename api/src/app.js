const express = require('express');
const cors = require('cors');
const config = require('./services/config');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const likedUserPostRoutes = require('./routes/liked-user-post');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);
app.use('/liked-user-post', likedUserPostRoutes);

app.listen(config.appPort, () => console.log(`server started at ${config.appPort}`));
