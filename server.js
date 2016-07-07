var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/dist'));
app.listen(3000);

console.log('Server listening on port 9222. Open http://localhost:3000 in a browser.');
