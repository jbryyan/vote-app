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
        console.log(decoded.username);
        let newArr = doc.map(function(item){
          let newObj = item.toObject();
          if(newObj.voters.indexOf(decoded.username) > -1){
            console.log('User already exists');
            newObj.voted = true;
          };

          delete newObj.voters;
          return newObj;
        });
        console.log(newArr);
        res.status(200).json({ myPolls: newArr });
      })

    });
  }else{
     // Grab polls from user and send
    Poll.find({}, { voters: 0 }, function(err, doc){
      if(err) throw err;
      console.log(doc)
      res.status(200).json({ myPolls: doc });
    })
  }


  //res.status(200).json({ username: req.tokenPayload.username, loggedIn: true });
};