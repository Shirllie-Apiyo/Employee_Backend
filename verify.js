const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "Akxjkxod#ndic1124");
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};