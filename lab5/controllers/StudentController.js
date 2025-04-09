const Student = require('../models/Student')


async function insert(req, res) {
    let student = new Student()
    Student.fullName = req.body.fullName
    Student.email = req.body.email
    Student.mobile = req.body.mobile
    Student.city = req.body.city
    try {
        await Student.save()
        res.redirect("/list")
    } catch (err) {
        console.log("Błąd podczas dodawania studenta: " + err)
    }
}
async function update(req, res) {
    try {
        await Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
        res.redirect("list")
    } catch (err) {
        console.log("Błąd podczas aktualizowania danych: " + err)
    }
}
module.exports = insert, update

