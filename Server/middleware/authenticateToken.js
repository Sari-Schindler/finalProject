import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {

    console.log("start authenticateToken")
    const authHeader = req.headers['authorization'];
    // console.log("authHeader", authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    // console.log("token", token)
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err){ 
            console.log("fail authenticateToken");
            return res.sendStatus(403);}
        console.log("pass authenticateToken", decoded)
        req.user = decoded;
        next();
    });
};

export default authenticateToken;