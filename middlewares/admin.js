
const isAdmin = (req, res, next) => {
    const secret = req.query.adminSecret;
    if(!secret || secret !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Not authorized to perform this action'});

    return next();
}

const resultProtect = (req, res, next) => {
    if (req.method === 'POST' && req.body.secret === process.env.ADMIN_SECRET) {
        return next();
    } else if (req.method === 'GET') {
        return res.render('password', { url: req.originalUrl });
    } else {
        return res.render('password', { error: 'Incorrect secret' });
    }
}

module.exports = { isAdmin, resultProtect };
