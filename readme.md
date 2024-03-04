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
<h1>CRUD in mongodb</h1>
  
