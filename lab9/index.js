const express = require("express");
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");

const options = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
    dhparam: fs.readFileSync("./dh-strong.pem")
};

const app = express();

app.use(helmet()); // Helmet middleware
app.use((req, res) => {
    res.status(200).send("hello world\n");
});

// Only HTTPS
https.createServer(options, app).listen(8080, () => {
    console.log("HTTPS server listening on https://127.0.0.1:8080");
});
