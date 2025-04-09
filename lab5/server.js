const express = require("express")
const path = require("path")
const handleBars = require("handlebars")
const exphbs = require("express-handlebars")
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access")
const db = require('./db')
const Student = require('./models/Student')
const SC = require('./controllers/StudentController')


const app = express()
module.exports = app

app.use(express.urlencoded({
    extended: true
}))

app.set("views", path.join(__dirname, "/"))

app.engine(
    "hbs",
    exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(handleBars),
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: path.join(__dirname, "layouts"),
    })
)

app.set("view engine", "hbs")
app.listen(3000, () => {
    console.log("Serwer nasłuchuje na porcie 3000")
})



app.get("/", (req, res) => {
    res.send(`
    <h3 style="text-align:center">Baza danych studentów</h3>
    <h4 style="text-align:center">Kliknij <a href="/list"> tutaj</a>, aby uzyskać dostęp do bazy.</h4>
    `);
})
app.get("/list", (req, res) => {
    Student.find().then((docs) => {
        res.render("list", {
            list: docs
        })
    }).catch((err) => {
        console.log("Błąd pobierania danych" + err)
    })
})
app.get("/addOrEdit", (req, res) => {
    res.render("addOrEdit", {
        viewTitle: "Dodaj studenta"
    })
})
app.post("/", (req, res) => {
    if (req.body._id == "") {
        SC.insert(req, res)
    } else {
        SC.update(req, res)
    }
})
app.get("/:id", (req, res) => {
    Student.findById(req.params.id).then((doc) => {
        res.render("addOrEdit", {
            viewTitle: "Zaktualizuj dane studenta",
            student: doc
        })
    }).catch((err) => {
        console.log("Błąd podczas akutalizowania danych" + err)
    })
})
app.get("/delete/:id", (req, res) => {
    Student.findByIdAndRemove(req.params.id).then((doc) => {
        res.redirect("/list")
    }).catch((err) => {
        console.log("Błąd podczas usuwania: " + err)
    })
})



db.Connect()


