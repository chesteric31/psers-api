var mongoose          = require('mongoose'),
    bcrypt            = require('bcrypt'),
    userSchema        = 
    	mongoose.Schema({
    						user_id:       { type: String, required: true, unique: true},
    						registered_on: { type: Date, default: Date.now },
    						watching_shows_tvmaze_ids: [{ type: Integer }]
		});

module.exports = mongoose.model('User', userSchema, 'users');