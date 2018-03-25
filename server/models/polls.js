const mongoose = require('mongoose');
const PollSchema = new mongoose.Schema({
  username: String,
  polls: { 
    _id: false,
    type: Array, 
    'default': [] 
  }
}, {collection: 'polls' });

module.exports = mongoose.model('Poll', PollSchema);