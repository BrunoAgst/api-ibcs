const express = require('express');
const router = express.Router();
const database = require('../database/database');

router.post('/v1/auth', (req, res) => {
    const {email, password} = req.body;

    if(email == undefined || password == undefined || email == ""){
        res.statusCode = 400;
        res.json("Informe um e-mail ou senha válido");
        return
    }

    
});

module.exports = router;