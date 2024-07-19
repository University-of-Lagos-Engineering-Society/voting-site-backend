
const isAdmin = (req, res, next) => {
    const secret = req.query.adminSecret;
    if(!secret || secret !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Not authorized to perform this action'});

    return next();
}

module.exports = isAdmin;
