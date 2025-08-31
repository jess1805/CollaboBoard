const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

exports.middleware_auth = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        
        if (!authHeader) {
            return res.status(401).json({ error: "Access Denied: No Token" });
        }

        const token = authHeader.replace(/^Bearer\s+/, "").trim();
        
        if (!token) {
            return res.status(401).json({ error: "Access Denied: Invalid Token Format" });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        
        console.log("Auth successful for user:", decoded.userId); 
        
        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ error: "Invalid Token" });
    }
};
