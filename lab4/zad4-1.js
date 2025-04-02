const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
let users = require('./users')


const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Prosty serwer oparty na szkielecie programistycznym Express!');
});

app.get('/about', (req, res) => {
    res.send('Autor strony: John Doe');
});


// app.get('/name/:imie/:imie2?', (req, res) => {
//     const { imie, imie2 } = req.params;
//     const message = imie2 ? `Cześć ${imie} i ${imie2}.` : `Cześć ${imie}.`;
//     res.status(200).type('text/html').send(`<h1>${message}</h1>`);
// });

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "form.html"))
})
app.post("/form", (req, res) => {
    let username = req.query.username
    let password = req.query.password

    if(!(username && password)){
        res.send("Uzupełnij dane!")
        return
    }
    res.send("Użytkownik: " + username + "<br>Hasło: " + password)
})

app.get("/form2", (req, res) => {
    res.sendFile(path.join(__dirname, "form2.html"))
})

app.post("/form2", (req, res) => {
    let names = req.body.username;
    let lang = req.body.lang;

    if (typeof lang === 'string') {
        lang = [lang];
    }

    if (!(names && lang && lang.length > 0)) {
        res.send("Uzupełnij dane!");
        return;
    }
    res.send("Użytkownik: " + names + "<br>Znajomość języków: " + "<ul>" + lang.map(l => "<li>" + l + "</li>").join("") + "</ul>");
});

app.get("/form3", (req, res) => {
    res.sendFile(path.join(__dirname, "form3.html"))
})

const getInitials = (fullName) => {
    return fullName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('.');
};

app.post("/form3",  [
    check('username')
        .trim()
        .bail()
        .stripLow()
        .isLength({ min: 3, max: 25 })
        .withMessage('Imię oraz Nazwisko muszą składać się z liter. Od 2 do 25 znaków.')
        .customSanitizer(value => getInitials(value)),
    check('email')
        .trim()
        .normalizeEmail()
        .bail()
        .stripLow()
        .isEmail()
        .withMessage('Niepoprawny adres email.'),
    check('age')
        .trim()
        .bail()
        .stripLow()
        .isNumeric()
        .isInt({ min: 0, max: 110 })
        .withMessage('Wiek musi być liczbą całkowitą z przedziału 0-110.')
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const nazwisko = req.body.username
    const email = req.body.email
    const wiek = req.body.age
    console.log(nazwisko + " " + email + " " + wiek)
    res.send("Użytkownik: " + nazwisko + "<br>Email: " + email + "<br>Wiek: " + wiek)
});

app.get('/api/users', (req,res) => {
    res.json(users);
})
app.get('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const user = users.find(user => user.id === parseInt(id));
    if(!user) {
        res.status(404).json({ message: `Użytkownik o id ${id} nie istnieje.` });
        return;
    }
    res.json(user);
})

app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        status: "aktywny"
    }

    if(!newUser.name || !newUser.email){
        return res.status(400).json({msg: `Wprowadź poprawne imię i nazwisko oraz email! ${newUser.name} ${newUser.email}`})
    }
    users.push(newUser)
    res.json(users)
})

app.patch('/api/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if(found){
        const updUser = req.body
        users.forEach(user => {
            if(user.id === parseInt(req.params.id)) {
                user.name = updUser.name ? updUser.name : user.name
                user.email = updUser.email ? updUser.email : user.email
                res.json({msg: 'Dane użytkownika zaktualizowane', user})
            }
        })
    } else {
        res.status(400).json({msg: `Użytkownik o id ${req.params.id} nie istnieje!`})
    }
})
app.delete('/api/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if(found){
        users = users.filter(user => user.id !== parseInt(req.params.id))
        res.json(users)
    } else {
        res.status(400).json({msg: `Użytkownik o id ${req.params.id} nie istnieje!`})
    }
})



app.listen(PORT, () => {
    console.log(`Serwer działa na porcie: ${PORT}`);
});