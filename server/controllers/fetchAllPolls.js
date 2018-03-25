const Poll = require('../models/polls');
const jwt = require('jsonwebtoken');
const config = require('../config/main');

module.exports = function(req, res){
  console.log('in auth token');
 
  if( req.header('Authorization') ){
    jwt.verify(req.header('Authorization').replace('Bearer ', ''), config.secret, function(err, decoded){
      if(err) console.log(err);
      Poll.find({}, function(err, doc){
        if(err) throw err;
        console.log(doc)
        
        res.status(200).json({ myPolls: doc[0].polls });
      })

    });
  }else{
     // Grab polls from user and send
    Poll.find({}, function(err, doc){
      if(err) throw err;
      console.log(doc)
      res.status(200).json({ myPolls: doc[0].polls });
    })
  }


  //res.status(200).json({ username: req.tokenPayload.username, loggedIn: true });
};