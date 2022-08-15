const express = require('express');
const cors = require('cors');
const config = require('./services/config');
const postsRoutes = require('./routes/posts');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postsRoutes);

app.listen(config.appPort, () => console.log(`server started at ${config.appPort}`));
