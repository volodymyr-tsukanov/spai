const mongoose = require("mongoose")


function Connect(){
    mongoose.connect("mongodb://localhost:27017/spai", { useNewUrlParser: true })
    .then((result) => {
        console.log("Połączono z bazą")
    }).catch((err) => {
        console.log("Nie można połączyć się z MongoDB. Błąd: " + err)
    })
}
module.exports = Connect