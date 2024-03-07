Code Side     -> DB-setup, Model, Schema

MongoDB Side  -> DB-formation, Collection, Documents

models (code) => collection(db)

schema (code) => Documents(db)

data of whole app is considered as database of app, but data of each thing like userData, orderData, productData etc is considered as collection

if collection contains data of 100 users then data of single user is said as Document

<b>so, we can conclude database > collection > document</b>

<h1>steps for mongodb setup</h1>
<ol>
  <li>
    install mongodb
  </li>
  <li>
    install mongoosejs
  </li>
  <li>
    require and setup connection
  </li>
  <li>
    make schema
  </li>
  <li>
    create model
  </li>
</ol>
  <ol>
    <li><h3>Download Mongodb community edition</h3><a href="https://www.mongodb.com/try/download/community">mongodb.com/try/download/community</a></li>
    <li><h3>
      Install Mongoose</h3>
      
      npm i mongoose
      
  </li>
    <li><h3>Require and setup connection</h3>
      
    const mongoose = require('mongoose')
      
    mongoose.connect("mongodb://127.0.0.1:27017/practiceKaro")
    
    // above connect line will make database with the name of practiceKaro on execution

      
  </li>
    <li><h3>Make Schema</h3>
    
      const userschema = mongoose.Schema({
        username: String,
        name: String,
        age: Number
    )}
  </li>
    <li><h3>create model</h3>

        module.exports = mongoose.model("user",userschema);
    
  </li>  
  </ol>
  on the view page import the above created usermodel
  
    const userModel = require('./users.js')
    


<h1>CRUD in mongodb</h1>
<h4>
  CREATE
</h4>

    router.get('/create/:user',async (req,res)=>{
      const newUser = await userModel.create({
          username:req.params.user,
          name:'uwuwuwuw',
          age:20
        })
        res.send(newUser);
      })

  <h4>READ</h4>
  
        router.get("/allusers",async (req,res)=>{
          const allUsers = await userModel.find()
          res.send(allUsers)
        })

  <h4>DELETE</h4>

    router.get("/deleteuser/:user",async(req,res)=>{
      let deletedUser = await userModel.findOneAndDelete({username:req.params.user})
      if (deletedUser != null){
        res.send(deletedUser)
      } else {
        res.send(`no user with the username ${req.params.user} found in database`)
      }
    })

<h4>UPDATE</h4>

    ---------------

<h1>SESSION</h1>
<ol>
  <li>get the express session 
    
      npm i express-session
  </li>
  <li>require it in main app.js
  
      var session = require('express-session')
  </li>
  <li>setup the session settings
  
      app.use(session({
        resave:false,
        saveUninitialized:false,
        secret:"jashgro"
      }))
  </li>
  <li>In index.js set ban settings in 2 steps
    <ul>
  <li>
    
        router.get("/banme",(req,res)=>{
          req.session.ban = true
          res.send("user banned")
        })
  </li>
  <li>
    
    router.use((req,res,next)=>{
      if (req.session.ban == true){
        res.send("404 banned user")
      }
      else(next())
    })
  </li>
    </ul>>
  </li>
</ol>
