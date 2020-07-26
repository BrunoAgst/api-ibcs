const express = require('express');
const router = express.Router();
const verifyLogin = require('../function/verifyLogin');
const database = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWTSecret = process.env.JWT_SECRET;

router.post('/v1/auth', async (req, res) => {

    const {email, password} = req.body;
    
    const data = await verifyLogin(email, password);

    if(data != undefined){
        res.statusCode = 400;
        res.json(data);
        return
    }

    database.select().table('users').then(data => {
        var cont = 0;
        
        for(var i = 0; i <= data.length; i++){

            if(email == data[i].email){
                var pass = bcrypt.compareSync(password, data[i].password);

                if(pass === true){
                    jwt.sign({id: data[i].id, email: data[i].email}, JWTSecret,(err, token) => {

                        if(err){
                            res.statusCode = 400;
                            res.json("Falha interna");
                            return
                        }

                        res.statusCode = 200;
                        res.json(token);
                        
                    });
                    return
                }
                else{
                    res.statusCode = 400;
                    res.json("Senha incorreta");
                    return  
                }
            }
            
            cont += 1;
           
            if(cont == data.length){
                res.statusCode = 400;
                res.json("Email não encontrado");
                return
            }   
                              
        }
        
    }).catch(err => {
        res.statusCode = 400;
        res.json("Erro");
    });

});


module.exports = router;