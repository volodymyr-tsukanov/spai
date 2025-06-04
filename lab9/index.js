const path = require('path')
const express = require('express')
const layout = require('express-layout')
const flash = require('express-flash')
const session = require('express-session');
const routes = require('./routes')
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");
const hbs = require('hbs');


const options = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
    dhparam: fs.readFileSync("./dh-strong.pem")
};
const app = express();

app.use(helmet()); // Helmet middleware
/*app.use((req, res) => {
    res.status(200).send("hello world\n");
});*/

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

const middlewares = [
    express.static(path.join(__dirname, 'public')),
    session({
        secret: 'super-secret-key',
        key: 'super-secret-cookie',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
    }),
    flash(),
    express.urlencoded({ extended: true })
];
app.use(middlewares);

app.use('/', routes)
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

// Only HTTPS
https.createServer(options, app).listen(8080, () => {
    console.log("HTTPS server listening on https://127.0.0.1:8080");
});







hbs.registerHelper('lengthObject', function (obj) {
    return Object.keys(obj).length;
});

hbs.registerHelper('eq', function (a, b) {
    return a === b;
});
