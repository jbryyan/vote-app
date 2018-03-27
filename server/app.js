// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const config = require('./config/main');
const mongoose = require('mongoose');
const register = require('./controllers/register');
const login = require('./controllers/login');
const authtoken = require('./controllers/authtoken');
const addNewPoll = require('./controllers/addNewPoll');
const fetchMyPolls = require('./controllers/fetchMyPolls');
const deletePoll = require('./controllers/deletePoll');
const fetchAllPolls = require('./controllers/fetchAllPolls');
const voteForPoll = require('./controllers/voteForPoll');
const expressjwt = require('express-jwt');

// Setup logger
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  exposedHeaders:['Authorization']
}));

//Connect to db using mongoose
//mongoose.connect(process.env.URL, { useMongoClient: true });
mongoose.connect(config.database);

// Used to protect routes, unless specified
// If the jwt token passed is not valid an error will be returned
/*app.use('/api', expressjwt({ secret: config.secret, userProperty: 'tokenPayload'})
  .unless({ path: 
    [
      '/api/register', '/api/login', 
    ]
  })
);
*/

var auth = expressjwt({ secret: config.secret, requestProperty: 'tokenPayload'});

// Register user 
app.post('/api/register', register);

// Login user with user credentials
app.post('/api/login', login);

// If token is valid, return username
app.get('/api/authtoken', auth, authtoken);

// Add a new poll to users db
app.post('/api/addNewPoll', auth, addNewPoll);

// Fetch the authenticated user polls
app.get('/api/fetchMyPolls', auth, fetchMyPolls);

// Delete specified poll by authenticated user
app.delete('/api/deletePoll', auth, deletePoll);

// Fetch all polls
app.get('/api/fetchAllPolls', fetchAllPolls);

// Vote for poll
app.put('/api/voteForPoll', auth, voteForPoll);

// Return error if not authorized
app.use(function(err, req, res, next){
  console.log(err);
  
  if(err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token...');
  }
  return res.status(err.status || 500).send(err); 
})


module.exports = app;
