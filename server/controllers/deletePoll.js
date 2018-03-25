const mongoose = require('mongoose');
const Poll = require('../models/polls');

module.exports = function(req, res){
  console.log('in delete poll');
  console.log(req.tokenPayload);
  console.log(req.query.id);
  const currentUser = req.tokenPayload.username;
  const query_id = req.query.id;
  const id = mongoose.Types.ObjectId(query_id);

  Poll.findOneAndUpdate(
    { username: req.tokenPayload.username },
    { $pull: { 
        polls: { id: id }
      }
    }, { new: true },
    function(err, doc){
      if (err) throw err;
      console.log(doc)
      res.status(200).json({ success: true, polls: doc.polls });
    }
  ); 
  //res.status(200).json({ username: req.tokenPayload.username, loggedIn: true });
};