const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var forceSSL = require('express-force-ssl');
const app = express();

var fs = require('fs');
var http = require('http');
var https = require('https');
// CORS Middleware

// Port Number


const port = process.env.PORT || 3000
 
// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.join(__dirname, '/majeni/dist/majeni')));
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//routes
app.use(forceSSL);
const contact = require('./contact');

app.use('/contact', contact);
app.use(cors());
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
// const forceSSL = function () {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(
//         ['https://', req.get('Host'), req.url].join('')
//       );
//     }
//     next();
//   }
// }

// // Instruct the app
// // to use the forceSSL
// // middleware
// app.use(forceSSL());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }

});

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + 'fresh/index.html'));
});

https.createServer({
  key: fs.readFileSync('privateKey.key'),
  cert: fs.readFileSync('certificate.crt')
  
}, app)
.listen(port, () => {
    console.log('Server started on port '+port);
  });
