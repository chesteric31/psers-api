 var User       = require('../models/user.server.model'),
    _           = require('lodash'),
    gcm         = require('node-gcm'),
    secrets     = require('../../config/secrets'),
    webPush     = require('web-push');

webPush.setGCMAPIKey(secrets.fcm);

module.exports = {

  notifyUsers: function(req, res){

    var sender = new gcm.Sender(secrets.fcm);
    var show_title = "Star trek";

    // Prepare a message to be sent
    var message = new gcm.Message({
        notification: {
          title: "Hi, new update for " + show_title,
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
      /*sender.send(message, { registrationTokens: user_ids }, function (err, response) {
        if (err) {
            console.error(err);
        } else {
          return res.json(response);
        } 
      });*/
      setTimeout(function() {
            webPush.sendNotification({
              endpoint: req.body.endpoint,
              TTL: req.body.ttl,
              keys: {
                p256dh: req.body.key,
                auth: req.body.authSecret
              }
            }, req.body.payload)
            .then(function() {
              res.sendStatus(201);
            })
            .catch(function(error) {
              console.log(error);
              res.sendStatus(500);
            });
          }, req.body.delay * 1000);
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