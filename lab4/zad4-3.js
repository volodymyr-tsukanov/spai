const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

const routes = require('./api/routes')

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes)
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie: ${PORT}`);
});