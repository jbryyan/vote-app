module.exports = function(req, res){
  console.log('in auth token');
  console.log(req.tokenPayload);

  res.status(200).json({ username: req.tokenPayload.username, loggedIn: true });
};