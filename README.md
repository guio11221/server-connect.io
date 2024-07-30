
## Instalação

```bash
 npm install server-connect.io
```
    
## Demonstração
 
1- Create a new Express application and set up sessions:
````javascript
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
````

2- Using flash messages in routes:
````javascript
app.get('/', (req, res) => {
  req.flash('info', 'Welcome!');
  res.send(req.flash('info'));
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
````
<br>
# Flash Function
The req.flash function is added to the request object. It can be used to set or get flash messages.

*Setting a flash message*

````javascript
   req.flash(type, msg);
````
<li>type (string):</li> The type of the message (e.g., 'info', 'error').
<li>msg (string | array):</li> The message or an array of messages to flash.
<br>
## Instalação

```bash
 npm install server-connect.io
```
    
## Demonstração
 
1- Create a new Express application and set up sessions:
````javascript
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
````

2- Using flash messages in routes:
````javascript
app.get('/', (req, res) => {
  req.flash('info', 'Welcome!');
  res.send(req.flash('info'));
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
````
<br>
# Flash Function
The req.flash function is added to the request object. It can be used to set or get flash messages.

*Setting a flash message*

````javascript
   req.flash(type, msg);
````
<li>type (string):</li> The type of the message (e.g., 'info', 'error').
<li>msg (string | array):</li> The message or an array of messages to flash.
<br>