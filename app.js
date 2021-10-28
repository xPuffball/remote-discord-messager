var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

const dotenv = require('dotenv')
const result = dotenv.config({path: 'process.env'})

var app = express();

// discord.js classes
const { Client, Intents } = require('discord.js');
const { channel } = require('diagnostics_channel');
const token = process.env.DISCORD_TOKEN

// creating a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.once('ready', () => {
  console.log('ready!')
})

client.login(token);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.send('enter some information after the slash!')
})

app.get('/:info', function(req, res, next) {
  const guild = client.guilds.cache.get("368212200369684482")
  const channel = guild.channels.cache.get("697028995107258429")
  const parsedReq = req.params.info
  channel.send(req.params.info)
  res.send('i think it worked! sending the data to the discord server...')
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
