const express = require('express');
const session = require('express-session');
const flash = require('server-connect.io');

const app = express();

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(flash());
app.use(flash.clearFlash());

app.get('/', (req, res) => {
  req.flash('info', 'Welcome!');
  res.send(req.flash('info'));
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
