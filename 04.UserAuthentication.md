01. Add these packages :

        npm i passport passport-local passport-local-mongoose mongoose express-session
02. Write app.js code first in the app.js file and write it after view engine and before logger

        var session = require('express-session')
        var flash = require('connect-flash');
        const passport = require('passport');
        // top up & bottom down
        app.set('view engine', 'ejs');
        
        app.use(session({
          resave:false,
          saveUninitialized:false,
          secret:"jashgro"
        }))
        
        app.use(passport.initialize())
        app.use(passport.session())
        passport.serializeUser(usersRouter.serializeUser())
        passport.deserializeUser(usersRouter.deserializeUser())
        
        app.use(flash())
        
        app.use(logger('dev'));
03. Setup users.js then properly

        const mongoose = require('mongoose')
        const plm = require('passport-local-mongoose')
        
        mongoose.connect("mongodb://127.0.0.1:27017/endgameusers")
        
        const userSchema = mongoose.Schema({
          username:String,
          password:String,
          secret:String
        })
        
        userSchema.plugin(plm)
        
        module.exports = mongoose.model("user",userSchema)
04. In index.js try register first and then other codes as well

        var express = require('express');
        var router = express.Router();
        const userModel = require('./users');
        const localStrategy = require('passport-local');
        const passport = require('passport');
        passport.use(new localStrategy(userModel.authenticate()))
        
        const isLoggedIn = (req,res,next)=>{
          if (req.isAuthenticated()){
            return next()
          }
          res.redirect('/')
        }
        
        router.get('/',(req,res)=>{
          console.log(req.session);
          const fetchUserLoggedIn = req.session
          fetchUserLoggedIn.passport?res.redirect("/profile"):res.render('index')
        })
        
        router.get('/profile', isLoggedIn ,(req,res)=>{
          console.log(req.session.passport.user);
          res.render('profile',{username:req.session.passport.user})
        })
        
        router.get('/register',(req,res)=>{
          res.render('register')
        })
        
        router.post('/register',(req,res)=>{
          var userdata = new userModel({
            username:req.body.username,
            secret:req.body.secret
          })
        
          userModel.register(userdata,req.body.password)
          .then((registereduser)=>{
            passport.authenticate('local')(req,res,()=>{
              res.redirect('/profile')
            })
          })
        })
        
        router.get('/login',(req,res)=>{
          res.render('login')
        })
        
        router.post('/login',passport.authenticate("local",{
          successRedirect:'/profile',
          failureRedirect:"/"
        }),(req,res)=>{})
        router.get('/logout',(req,res,next)=>{
          req.logOut((err)=>{
            if (err) {return next(err)}
            res.redirect('/')
          })
        })
        
        
        module.exports = router;
   
