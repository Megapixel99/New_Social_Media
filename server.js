const express = require('express');
const bodyParser = require('body-parser');

const routes = require("./routes");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('./'));
app.use('/js', express.static('./Client/JS'));
app.use('/css', express.static('./Client/CSS'));
app.use('/images', express.static('./Client/Images'));

app.use(routes);

var port = process.env.PORT || 3000;
app.listen(port);
