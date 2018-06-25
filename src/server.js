
const bodyParser = require("body-parser");
const express = require("express");
const url = require("url");
const util = require("util");

const { evaluate } = require('./eval');

const app = express();
const router = express.Router();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

router.post('/sandbox', function(req, res) {
  console.log(req.body);
  res.send(evaluate(req.body.vars));
});

app.use('/', router);

app.listen(8000,function(){
  console.log("sandbox running on port 8000");
})