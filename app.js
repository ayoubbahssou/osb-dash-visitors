//index.js/
var express = require('express'),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    jwt=require('jsonwebtoken'),
	 //methodOverride = require('method-override'),
    //session = require('express-session'),
    passport = require('passport'),
    path=require('path'),
    LocalStrategy = require('passport-local'),
    controllers = require('./routes/api/controllers');



//We will be creating these two files shortly
 //var config = require('./config.js'), //config file contains all tokens and other private info
   var funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

var app = express();



//===============PASSPORT==============

// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj.username);
  done(null, obj);
});
// Use the LocalStrategy within Passport to login/”signin” users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
      /*  var token = jwt.sign(user,'i am a secret', {
                expiresInMinutes: 1440 // expires in 24 hours
          });
        /*req.json({
              success: true,
              message: 'authentificated successfully',
              token: token
          });*/

				done(null, user);

      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        //req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));


//===============EXPRESS================
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
//pp.use(passport.session());

app.use(express.static('views'));
//app.use(express.static(path.join(__dirname,'views')));
// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//===============ROUTES===============
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
//router.get('/statistic', controllers.visitorsApi.getStatisticsByCriteria);
app.get('/stats', function(req, res){
    // check header or url parameters or post parameters for token
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
	var token=req.headers.authorization;
console.log(req.headers.authorization);
console.log(req.body);
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token,'i am a secret', function(err, decoded) {
            if (err) {
console.log('token not correct');
                return res.status(401).send({
                    success: false,
                    message: 'Failed to authenticate.'
                });

            } else {
                // if everything is good, save to request for use in other routes
                //res.decoded = decoded;
                /*return res.status(200).send({
                    success:true,
                    message: 'successful authentication.'
                });*/
console.log('token yeyyy!!');


                    controllers.visitorsApi.getStatisticsByCriteria(req,res);

            }
        });

    } else {
console.log('no token ');
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
console.log('no token');
    }
    // res.send(req.user)
    //res.send('home')
    //res.sendfile('views/index.html')
});
app.get('/statsOnMap', function(req, res){
    // check header or url parameters or post parameters for token
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var token=req.headers.authorization;
    console.log(req.headers.authorization);
    console.log(req.body);
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token,'i am a secret', function(err, decoded) {
            if (err) {
                console.log('token not correct');
                return res.status(401).send({
                    success: false,
                    message: 'Failed to authenticate.'
                });

            } else {
                // if everything is good, save to request for use in other routes
                //res.decoded = decoded;
                /*return res.status(200).send({
                 success:true,
                 message: 'successful authentication.'
                 });*/
                console.log('token yeyyy!!');


                    controllers.visitorsApi.getStatisticsByCriteriaOnMap(req,res);

            }
        });

    } else {
        console.log('no token ');
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
        console.log('no token');
    }
    // res.send(req.user)
    //res.send('home')
    //res.sendfile('views/index.html')
});
app.get('/statsByDate', function(req, res){
    // check header or url parameters or post parameters for token
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var token=req.headers.authorization;
    console.log(req.headers.authorization);
    console.log(req.body);
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token,'i am a secret', function(err, decoded) {
            if (err) {
                console.log('token not correct');
                return res.status(401).send({
                    success: false,
                    message: 'Failed to authenticate.'
                });

            } else {
                // if everything is good, save to request for use in other routes
                //res.decoded = decoded;
                /*return res.status(200).send({
                 success:true,
                 message: 'successful authentication.'
                 });*/
                console.log('token yeyyy!!');

                    controllers.visitorsApi.gettatisticByCriteriaAndDate(req,res);
            }
        });

    } else {
        console.log('no token ');
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
        console.log('no token');
    }
    // res.send(req.user)
    //res.send('home')
    //res.sendfile('views/index.html')
});



app.get('/',  function(req, res) {
 res.sendfile('angular-parts/login.html')
})
//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
/*app.post('/signup', passport.authenticate('local-signup'),  function(req, res) {
  createSendToken(req.user,res);
});*/

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/signin', passport.authenticate('local-signin'),  function(req, res, next) {
  createSendToken(req.user,res);
});

function createSendToken(user,res) {
  var token = jwt.sign(user.pseudo,'i am a secret', {
           expiresInMinutes: 1440 // expires in 24 hours
     });
    //console.log(req.user);
  return res.status(200).send({
      user:user,
      token: token
    });
   /* res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });*/

  }



/**
 * Routing Api
 * @type {*|number}
 */

//app.use('/api/visitors', require('./routes/api'));




//===============PORT=================
var port = process.env.PORT || 5000; //select your port or let it pull from your .env file
//app.listen(port);
app.listen(port);

console.log("listening on " + port + "!");
