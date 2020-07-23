const express = require('express');
const router = express.Router();
const database = require('../database/database');
const verifyJSON = require('../function/verifyJSON');

router.get('/v1/form', (req, res) => {
    
    database.select().table("form").orderBy("id", "asc").then(data => {
        res.statusCode = 200;
        res.json(data);
        
    }).catch(err => {
        res.statusCode = 400;
        res.send("Error");

    });
});

router.post('/v1/form', async (req, res) => {
    const form = req.body;
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

router.delete('/v1/form/:id', (req, res) => {
    const id = req.params.id;
    var idN = parseInt(id);

    if(idN === null || idN === undefined || idN.length <= 0){
        res.statusCode = 400;
        res.send("ID inválido");
        return
    }
    database.select().where({id: idN}).table("form").then(data => {
        if(data.length < 1){
            res.statusCode = 404;
            res.send("Não encontrado");
            return
        };

        database.where({id: idN}).delete().table("form").then(data => {
            res.statusCode = 200;
            res.send("Deletado com sucesso");
    
        }).catch(err => {
            res.statusCode = 404;
            res.send("Erro");
    
        });
    });
        
});

module.exports = router;