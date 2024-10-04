const jwt = require('jsonwebtoken');

const JWT_SECRET = 'test_key';

const authMiddleware = (req, res, next) => {
    try { 
        //bearer <token>
        const token = req.header('Authorization')?.split(' ')[1];
        
        if(!token){
            res.status(401).json({ message: 'no token found'});
        } else {
            //pass user into req
            const user = jwt.verify(token, JWT_SECRET);
            req.user = user;
            next();
        }
    } catch (err){
        console.log(err);
        res.status(401).json({ message: 'invalid token', err })
    }
    
}

module.exports = authMiddleware;