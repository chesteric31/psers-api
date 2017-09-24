var User          = require('./controllers/user.server.controller'),
    Notification  = require('./controllers/notification.server.controller');

module.exports = function(app) {

  app.get('/api',  User.welcome);

  app.get('/api/user/:user_id',		User.getUser);
  app.get('/api/users',				User.getUsers);
  app.post('/api/users',           	User.createUser);
  app.delete('/api/user/:user_id', 	User.deleteUser);

  app.post('/api/notify', Notification.notifyUsers);
  app.post('/api/notify/:user_id', Notification.notifyOneUser);
};
