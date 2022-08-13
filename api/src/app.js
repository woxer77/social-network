const express = require('express');
const config = require('./services/config');
const postsRoutes = require('./routes/posts');

const app = express();

app.use(express.json());

app.use('/posts', postsRoutes);

app.listen(config.appPort, () => console.log(`server started at ${config.appPort}`));
