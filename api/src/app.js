const express = require('express');

const config = require('./services/config');

const app = express();

app.listen(config.appPort, () =>
  console.log('server started at ' + config.appPort)
);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
