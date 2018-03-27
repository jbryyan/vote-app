const mongoose = require('mongoose');
const PollSchema = new mongoose.Schema({
  totalVotes: Number,
  text: String,
  options: [{
    text: String,
    value: String,
    votes: Number
  }],
  madeBy: String,
  date: String,
  voters: [{
    type: String,
  }],
  voted: {
    type: Boolean,
    default: false
  }
}, {collection: 'polls' });

module.exports = mongoose.model('Poll', PollSchema);

/*
 const data = {
    id: mongoose.Types.ObjectId(),
    totalVotes: 0, text: pollData.question,
    options: [ ],
    madeBy: username, date: `${month}/${day}/${year}`,
    voters: []
  };
    polls: { 
    _id: false,
    type: Array, 
    'default': [] 
  }
*/