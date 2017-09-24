 var User       = require('../models/user.server.model'),
    _           = require('lodash'),
    gcm         = require('node-gcm'),
    secrets     = require('../../config/secrets');

module.exports = {

  notifyUsers: function(req, res){

    var sender = new gcm.Sender(secrets.fcm);

    // Prepare a message to be sent
    var message = new gcm.Message({
        notification: {
          title: "Hi, new update for PSERS",
          icon: "ic_launcher",
          body: "Click to see the latest episodes"
        }
    });

    User.find({}, function(err, users) {

      // user subscription ids to deliver message to
      var user_ids = _.map(users, 'user_id');

      console.log("User Ids", user_ids);

      console.log(sender);

      // Actually send the message
      sender.send(message, { registrationTokens: user_ids }, function (err, response) {
        if (err) {
            console.error(err);
        } else {
          return res.json(response);
        } 
      });
    });
   
  },

  notifyUser: function(req, res) {
    var show_title = req.body.show_title;
console.log(show_title);
    var message = new gcm.Message({
        notification: {
          title: "Hi, new update for " + show_title,
          icon: "ic_launcher",
          body: "Click to see the latest episode"
        }
    });

    var userId = req.params.user_id;
    console.log(req.params);
    var sender = new gcm.Sender(secrets.fcm);
    sender.send(message, { registrationTokens: user_id }, function (err, response) {
      if (err) {
          console.error(err);
      } else {
        return res.json(response);
      } 
    });
   
  }
};