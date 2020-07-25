const express = require('express');
const router = express.Router();
const verifyLogin = require('../function/verifyLogin');
const database = require('../database/database');
const bcrypt = require('bcrypt');

router.post('/v1/auth', async (req, res) => {

    const {email, password} = req.body;
    
    const data = await verifyLogin(email, password);

    if(data != undefined){
        res.statusCode = 400;
        res.json(data);
        return
    }

    database.select(["email", "password"]).table('users').then(data => {

        for(var i = 0; i <= data.length; i++){
            if(email == data[i].email){
                var pass = bcrypt.compareSync(password, data[i].password);

                if(pass === true){
                    res.json("Token");
                    return
                }
                else{
                    res.statusCode = 400;
                    res.json("Senha incorreta");
                    return  
                }
            }
           
            if(i <= parseInt(data.length)){
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