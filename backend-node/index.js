var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

const port = 8000

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(
        '<html><body>Hello there sunshine!!</body></html>'
    );
});

var lions = []
var id = 0

app.get('/lions', () => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(
        '<html><body>GET</body></html>'
    );
})

app.get('/lions', (req, res) => {
    res.statusCode = 200;
    res.send(bodyParser(lions));
})

app.listen(port, () => {
    console.log('listening on http://localhost:'+port);
});

