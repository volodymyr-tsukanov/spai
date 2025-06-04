const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        data: {},
        errors: {}
    })
})
router.post('/contact', (req, res) => {
    const { message, email } = req.body;
    const errors = {};

    if (!message || message.trim() === '') {
        errors.message = { msg: 'A message is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.email = { msg: 'That email doesn’t look right' };
    }

    if (Object.keys(errors).length > 0) {
        return res.render('contact', {
            data: { message, email },
            errors
        });
    }

    // Success: optionally redirect or show success message
    res.send('Thank you for your message!');
});



module.exports = router