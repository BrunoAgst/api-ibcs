const express = require('express');
const router = express.Router();
const database = require('../database/database');
const verifyJSON = require('../function/verifyJSON');

router.get('/v1/form', (req, res) => {
    
    database.select().table("form").orderBy("id", "asc").then(data => {
        res.json(data);
    
    }).catch(err => {
        console.log(err);
        res.send("Error");

    });
});

router.post('/v1/form', async (req, res) => {
    var form = req.body;
    var result = await verifyJSON(form);

    if(result !== true){
        res.sendStatus(400);
        return
    }

    database.insert(form).into("form").then(data => {
        res.statusCode = 200;
        res.send("Cadastrado com sucesso");
        return
    }).catch(err => {
        console.log(err)
        res.sendStatus = 400;
        res.send("Error");
        return
    });

});


module.exports = router;