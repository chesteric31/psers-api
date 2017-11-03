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
        users.forEach(function(user) {
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
        });
    });
  },

  notifyUser: function(req, res) {
    var show_title = req.body.show_title;
    var userId = req.params.user_id;

    User.findOne({userId: userId}, function (error, user) {
      if (error) {
        return res.status(404).json({success: false, message: "User is not found"});
      }
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
          return res.sendStatus(201);
        })
        .catch(function(error) {
          console.log(error);
          return res.sendStatus(500);
        });
    });
   
  }
};