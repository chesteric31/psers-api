 var User       = require('../models/user.server.model');

module.exports = {

  welcome: function(req, res){
    return res.status(200).json({ message: 'Welcome to the API that powers the push notifications for https://chesteric31.github.io/psers/'});
  },

  createNewUser: function(req, res){
    var user           = new User();
    user.user_id       = req.body.user_id;
    user.watching_shows_tvmaze_ids = req.body.watching_shows_tvmaze_ids;

    user.save( function(err, users){
      if(err) {
        return res.json({ Error: err });
      } else {
        return res.status(201).json({ success: true, message: "User Created successfully." });
      }
    });
  },

  deleteOneUser: function(req, res, next){
    var userId   = req.params.user_id;

    console.log(userId);

    User.remove({user_id: userId}, function (err, user) {
      if(err) {
        return res.status(404).json({success: false, message: 'User Details Not Found'});
      }

      res.json({success: true, message: 'Delete Successful'});
      next();
    });
  },

  getOneUser: function(req, res) {
    var userId = req.params.user_id;
    User.findOne({user_id: userId}, function (error, user) {
      if (error) {
        return res.status(404).json({success: false, message: "User is not found"});
      }
      return res.status(200).json({success: true, user: user});
    })
  }

  getAllUsers: function(req, res) {
    User.find({}, function (error, users) {
      if (error) {
        return res.status(404).json({success: false, message: "User is not found"});
      }
      return res.status(200).json({success: true, users: users});
    })
  }
};