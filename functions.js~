var bcrypt = require('bcryptjs');
var q = require('q');
//var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

/*var connection = mongoose.createConnection("mongodb://localhost/osb-user-tracker");
autoIncrement.initialize(connection);*/
var database = require('/home/ayoub/userTracker/models');
//UserSchema =require('./models/schemas');
//var User =database.user;

//var User = mongoose.model('User', UserSchema);
/*var user=new User({login:'ayoub',pseudo:'pass'})
 console.log(user.username)
 user.save();
//var un='ayoub'*/

/*var hash = bcrypt.hashSync('lala', 8);
 var user=new User({username:'abdou',password:hash})*/
//	user.save()
exports.localAuth = function (un, pswd) {
    var deferred = q.defer();
    console.log('in auth');
    database.getCollection('User').findOne({'login': un}, function (err, res) {
   // User.findOne({'username': un}, function (err, res) {
        if (err) {
            deferred.reject(new Error(err));
            console.log(err)

        }
        if (res == undefined) {
            console.log('no user matches the search');
            deferred.resolve(false);
        }
        if (res) {

            if (bcrypt.compareSync(pswd, res.password)) {
                console.log('correct credentials');
                //	var user={Username:un,password:res.password}
                // create a token
                /*	var token = jwt.sign(res,'i am a secret', {
                 expiresInMinutes: 1440 // expires in 24 hours
                 });
                 res.json({
                 success: true,
                 message: 'authentificated successfully',
                 token: token
                 });*/
                deferred.resolve(res)
            }
            if (!bcrypt.compareSync(pswd, res.password)) {
                console.log('wrong pw');
                deferred.resolve(false)
            }

        }
    });
    return deferred.promise;
};
exports.localReg = function (un, pswd) {
    console.log('in register');
    var deferred = q.defer();

   var hash = bcrypt.hashSync(pswd, 8);
//console.log('in register')
//console.log('in register')
    //check if username is already assigned in our database
     database.getCollection('User').findOne({'login': un}, function (err, user) {
        if (user == undefined) {
            console.log('Username available');
            var User= database.getCollection('User')
            var vser = new User({login:un ,pseudo:un,password: hash});
          // database.getCollection('User').save({'pseudo': un,'login':un,'password':hash}, function (err, vser) {

               // user.save();//add_user(first,last,email,un,pw)
                //db.User.insert( { username:un,password:hash } )
                 vser.save();
                // create a token
                console.log('saved!!');

                   //  console.log(vser)
                deferred.resolve(vser);
           // })
        }
        if (user) {
            console.log('username already exists');
            deferred.resolve(false); //username already exists
        }

    })
//test the token
    /*var user={username:'ayoub',password:'kabkab'};
    deferred.resolve(user);
*/
    return deferred.promise;
};
//authentificate('simo','darkOs')
//register('simo','darkOs')
//authentificate(abdo)
