const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const router = require('./routes/router');

const app = express();
const port = process.env.PORT || 30000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})