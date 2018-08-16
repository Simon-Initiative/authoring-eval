const bodyParser = require("body-parser");
const express = require("express");
const cluster = require("express-cluster");

const { evaluate } = require('./eval');

cluster(function(worker) {
  
  const app = express();
  const router = express.Router();

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true })); 

  router.post('/sandbox', function(req, res) {
    console.log(req.body);
    res.send(evaluate(req.body.vars));
  });

  app.use('/', router);

  return app.listen(8000, '0.0.0.0', function(){
    console.log("evaluator running on port 8000");
  });
});
