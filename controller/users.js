const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const verifyLogin = require('../function/verifyLogin');
const database = require('../database/database');
const auth = require('../middleware/auth');

router.post('/v1/users', auth, async (req, res) => {
    const {email, password} = req.body;

    var data = await verifyLogin(email, password);

    if(data != undefined){
        res.statusCode = 400;
        res.json(data);
        return
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    database.select(["email"]).where({email: email}).table('users').then(data => {
        if(data.length >= 1){
            res.statusCode = 401;
            res.json("Email já cadastrado");
            return
        }
        
        database.insert({email: email, password: hash}).into('users').then(data => {
            res.statusCode = 200;
            res.json("Usuário Cadastrado com sucesso");
    
        }).catch(err => {
            res.statusCode = 400;
            res.json("Erro");
        });

    }).catch(err => {
        res.statusCode = 400;
        res.json("Erro");
    });

});

module.exports = router;