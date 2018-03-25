const Poll = require('../models/polls');
const mongoose = require('mongoose');

module.exports = function(req, res){
  //let newPoll = new Poll({ username: req.body.username });
  //newPoll.save();

  console.log(req.body);
  console.log(req.tokenPayload.username);
  let pollData = req.body;
  const username = req.tokenPayload.username;
  let today = new Date();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let year = today.getFullYear();



  /*
  data: 
  [
    { 
      id: '12', totalVotes: '60', text: 'Best burgers in the west', 
      options:
      [
        { text: 'June', value: 'June', votes: '12' },
        { text: 'March', value: 'March', votes: '1' },
        { text: 'Sept', value: 'Sept', votes: '12' },
        { text: 'July', value: 'July', votes: '13' },
        { text: 'August', value: 'August', votes: '22' }
      ], 
      madeBy: 'june', date: '11/12/18' 
    } 
  ],*/

  
  const data = {
    id: mongoose.Types.ObjectId(),
    totalVotes: 0, text: pollData.question,
    options: [ ],
    madeBy: username, date: `${month}/${day}/${year}`,
    voters: []
  };
  
  Object.keys(pollData).forEach(key => {
    if(key !== 'question'){
      data.options.push({
        text: pollData[key],
        value: pollData[key],
        votes: 0
      });
    }
  });

  Poll.findOneAndUpdate(
    { username: username },
    { $push: { 
        polls: data 
      }
    },
    function(err, doc){
      if(err) throw(err);
      res.status(200).json({ success: true });
    }
  );
};