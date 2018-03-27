const Poll = require('../models/polls');
const mongoose = require('mongoose');

module.exports = function(req, res){
  console.log('in auth token');
  console.log(req.tokenPayload);
  console.log(req.body);
  const doc_id = mongoose.Types.ObjectId(req.body.id);
  const option_voted = req.body.option;
  const username = req.tokenPayload.username;
  /*
  Poll.findOneAndUpdate(
    { _id: doc_id },
    { $addToSet: { 
        voters: req.body.option,
      }
    }, 
    function(err, doc) {
      Poll.findOneAndUpdate({ username: username })
    });
    */

  Poll.findOne({ _id: doc_id }, function (err, doc){
    if (err) console.log(err);
    console.log(doc);
    if(doc.voters.indexOf(username) > -1){
      res.status(401).json({ success: false, message: 'Can only vote once per poll' });
    }else{
      doc.voters.push(username);
      console.log(doc.options.findIndex(item => item.text === option_voted ));
      for(i=0; i < doc.options.length; i++){
        if(doc.options[i].text === option_voted){
          doc.options[i].votes = doc.options[i].votes + 1;
          doc.totalVotes++;
          break;
        }
      }
      console.log(doc);
      doc.save(function(err) {
        if(err) console.log(err);
        res.status(200).json({ success: true });
      });
      
    }
  })

  //res.status(200).json({ username: req.tokenPayload.username, loggedIn: true });
};