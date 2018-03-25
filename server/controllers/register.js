const User = require('../models/user');
const Poll = require('../models/polls');
const jwt = require('jsonwebtoken');
const config = require('../config/main');

module.exports = function(req, res){
  console.log(req.body.username);
  console.log(req.body.password);
  if(!req.body.username || !req.body.password) {
    res.json({ success: false, message: 'Please enter a username and password to register.' });
  } else {
    console.log("In register let new user.")
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      location: req.body.location
    });
    console.log(newUser);
    // Attempt to save new user
    newUser.save((err) => {
        console.log(err);
        if (err && err.code === 11000) return res.status(401).json({ success: false, message: 'Username must be unique' });
        else if (err) return res.status(401).json({ success: false, message: err.errors.username.message });
        else{ //res.json({ success: true, message: 'Successfuly created new user.' });
          //jwt.sign(JSON.parse(JSON.stringify(newUser)), process.env.SECRET, { expiresIn: '1h' },
          let newPoll = new Poll({ username: req.body.username });
          newPoll.save();


          jwt.sign({ username: req.body.username }, config.secret, { expiresIn: '1h' },
          function(err,token){
              if (err) throw err;
              res.setHeader('Authorization', 'Bearer ' + token);
              res.status(200).json({ success: true, username: req.body.username});
          });

        }
    });
  }
};
