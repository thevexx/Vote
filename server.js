
const Joi = require('joi');
//Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/voteDb')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
  if ('OPTIONS' === req.method) { return res.send(200); }
  next();
});

const user = require('./server/routes/user');
app.use('/api/user', user);

const subject = require('./server/routes/subject');
app.use('/api/subject', subject);

const vote = require('./server/routes/vote');
app.use('/api/vote', vote);

const admin = require('./server/routes/admin');
app.use('/api/admin', admin);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
