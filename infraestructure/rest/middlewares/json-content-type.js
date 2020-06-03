const jsonContentType = (req, res, next) => {
    if (res.body) {
        res.setHeader('Content-Type', 'application/json');
    }

    next();
}

module.exports = jsonContentType;