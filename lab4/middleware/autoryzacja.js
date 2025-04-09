const isAuthorized = (req, res, next) => {
    const { password } = req.query;
    if (password === 'secretpaswd') {
        next();
    } else {
        res.status(401).send('Dostęp zabroniony');
    }
};
module.exports = isAuthorized;