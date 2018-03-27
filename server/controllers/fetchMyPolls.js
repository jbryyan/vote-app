const Poll = require('../models/polls');

module.exports = function(req, res){
  console.log('in auth token');
  console.log(req.tokenPayload);
  // Grab polls from user and send
  Poll.find({ madeBy: req.tokenPayload.username }, function(err, doc){
    if(err) throw err;
    console.log(doc);
    res.status(200).json({ myPolls: doc });
  })

  //res.status(200).json({ username: req.tokenPayload.username, loggedIn: true });
};