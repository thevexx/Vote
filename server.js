
const Joi = require('joi');
//Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/voteDb')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

const user = require('./server/routes/user');
app.use('/api/user', user);

const subject = require('./server/routes/subject');
app.use('/api/subject', subject);

const vote = require('./server/routes/vote');
app.use('/api/vote', vote);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
