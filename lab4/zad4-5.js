const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

const routes = require('./api/routes')
const hbs = require('hbs')
const path = require('path')
const reactEngine = require('express-react-views')

//app.set('view engine', 'hbs'); // HBS ENGINE

app.set('view engine', 'jsx'); // JSX ENGINE
app.engine('jsx', reactEngine.createEngine()); // JSX ENGINE


app.set('views', path.join(__dirname, 'views'));

app.get('/about', (req, res) => {
    res.render('about', { name: 'Student' });
})

app.get('/info', (req, res) => {
    res.render('info', { surname: 'Student Surname', email: "student@email.pl", age: 20 });
})

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie: ${PORT}`);
});