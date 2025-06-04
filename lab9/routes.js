const express = require('express')
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/contact', csrfProtection, (req, res) => {
    res.render('contact', {
        data: {},
        errors: {},
        csrfToken: req.csrfToken()
    })
})
router.post('/contact', csrfProtection, (req, res) => {
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
            errors,
            csrfToken: req.csrfToken()
        });
    }

    // Success: optionally redirect or show success message
    res.send(`
        <h1>Thank you for your message!</h1>
        <p><a href="/" style="display:inline-block; padding:8px 16px; background:#007BFF; color:#fff; text-decoration:none; border-radius:4px;">Return to Home</a></p>
      `);
});



module.exports = router