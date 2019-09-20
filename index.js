const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


var auth = require('./routes/auth');
var residentRoutes = require('./routes/residentRoutes')
var authorityRoutes = require('./routes/authorityRoutes')

app.use("/auth",auth)
app.use("/resident",residentRoutes)
app.use("/authority",authorityRoutes)

mongoose.connect('mongodb://localhost/citra', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("DB connection successful")
  app.listen(port, () => console.log(` app listening on port ${port}!`))

});

module.exports = app
