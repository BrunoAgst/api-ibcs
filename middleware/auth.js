const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const authToken = req.headers['authorization'];
    
    if(authToken != undefined){

        var bearer = authToken.split(' ');
        const token = bearer[1];

        jwt.verify(token, jwtSecret, (err, data) => {
            if(err){
                res.status(401);
                res.json("Token inválido");
                return
            }else{
                next();
            }
        });
        return
    }

    res.statusCode = 400;
    res.json("Token vazio");
    return
};