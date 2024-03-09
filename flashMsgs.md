<h1>Creating flash Msgs</h1>
<ol>
  <li>Add connect-flash to node packages
  
        npm i connect-flash
  </li>
  <li>Require flash in app.js
  
      const flash = require("connect-flash")
  </li>
  <li>Use flash in app.js: add this just after app.use(session({})) line 
  
      app.use(flash())
  </li>
  <li>Index.js code:
  
    var express = require('express');
    var router = express.Router();
    
    router.get('/email/:emailid', function(req, res) {
      req.flash("email",req.params.emailid)
      res.send(`entered email is ${req.params.emailid}. <br/> Go to check page to check it <br/> <a href="/check">Check Now</a>`)
    });
    
    router.get('/check', function(req, res) {
      const email = req.flash("email")
      {email.length!=0?res.send(`The email you entered is ${email[0]}`):res.send(`No email entered`)}
      
    });
    
    module.exports = router;
  </li>
  <li>Flash drains the value after reading it once</li>
</ol>
