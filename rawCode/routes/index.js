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