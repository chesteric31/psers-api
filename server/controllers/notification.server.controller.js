 var User       = require('../models/user.server.model'),
    _           = require('lodash'),
    gcm         = require('node-gcm'),
    secrets     = require('../../config/secrets'),
    webPush     = require('web-push');

webPush.setGCMAPIKey(secrets.fcm);

module.exports = {

  notifyUsers: function(req, res) {
    var show_title = "Star trek";
    User.find({}, function(err, users) {
        for (var user in users) {
        console.log("user", user);
            webPush.sendNotification({
              endpoint: user.endpoint,
              TTL: 1,
              keys: {
                p256dh: user.key,
                auth: user.authSecret
              }
            }, show_title)
            .then(function() {
              res.sendStatus(201);
            })
            .catch(function(error) {
              console.log(error);
              res.sendStatus(500);
            });
        }
    });
  },

  notifyUser: function(req, res) {
    var show_title = req.body.show_title;

    console.log("show title: " + show_title);
    
    var currentMessage = new gcm.Message({
          "data": {
            title: "Hi, new update for " + show_title,
            icon: "ic_launcher",
            body: "Click to see the latest episode"
          }
    });

    console.log(currentMessage);

    var userId = req.params.user_id;
    var sender = new gcm.Sender(secrets.fcm);
    sender.send(currentMessage, { registrationTokens: [userId] }, function (err, response) {
      if (err) {
          console.error(err);
      } else {
        return res.json(response);
      } 
    });
   
  }
};