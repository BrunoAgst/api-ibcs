const express = require('express');
const router = express.Router();
const verifyLogin = require('../function/verifyLogin');
const database = require('../database/database');

router.post('/v1/auth', async (req, res) => {

    const {email, password} = req.body;
    
    const data = await verifyLogin(email, password);

    if(data != undefined){
        res.statusCode = 400;
        res.json(data);
        return
    }

});


module.exports = router;