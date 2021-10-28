const dotenv = require('dotenv')
const result = dotenv.config({path: './process.env'})
var express = require('express');
var router = express.Router();

//discord.js classes

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(process.env.DISCORD_TOKEN)
});

module.exports = router;
