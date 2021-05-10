require('dotenv').config();
const db = require('./SQL/connection');
const express = require('express');

const app = express();

//Initialize middleware, used to be bodyparser
app.use(express.json());

app.get('/', (req, res) => res.send('api server is working'));
app.use('/offices', require('./routes/offices'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`[⚡️ server] app is listening on port ${PORT}`)
);
