const Poll = require('../models/polls');
const mongoose = require('mongoose');

module.exports = function(req, res){
  console.log('in auth token');
  console.log(req.tokenPayload);
  // Grab polls from user and send
  const id = mongoose.Types.ObjectId(req.query.id);

  Poll.findOne({ _id: id }, { voters: 0 }, function(err, doc){
    if(err) throw err;
    console.log(doc);
    res.status(200).json({ poll: doc });
  })

  //res.status(200).json({ username: req.tokenPayload.username, loggedIn: true });
};