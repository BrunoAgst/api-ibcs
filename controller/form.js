const express = require('express');
const router = express.Router();
const database = require('../database/database');
const verifyJSON = require('../function/verifyJSON');
const auth = require('../middleware/auth');

router.get('/v1/form', (req, res) => {
    
    database.select().table("form").orderBy("id", "asc").then(response => {
        res.statusCode = 200;
        res.json(response);
        
    }).catch(err => {
        res.statusCode = 400;
        res.send("Error");

    });
});

router.post('/v1/form', auth, async (req, res) => {
    const data = req.body;
    var result = await verifyJSON(data);

    if(result !== true){
        res.sendStatus(400);
        return
    }

    database.insert(data).into("form").then(response => {
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

router.delete('/v1/form/:id', auth, (req, res) => {
    const id = req.params.id;
    const idN = parseInt(id);

    if(idN === null || idN === undefined || idN.length <= 0){
        res.statusCode = 400;
        res.send("ID inválido");
        return
    }
    database.select().where({id: idN}).table("form").then(response => {
        if(data.length < 1){
            res.statusCode = 404;
            res.send("Não encontrado");
            return
        };

        database.where({id: idN}).delete().table("form").then(response => {
            res.statusCode = 200;
            res.send("Deletado com sucesso");
    
        }).catch(err => {
            res.statusCode = 404;
            res.send("Erro");
    
        });
    });     
});

router.put('/v1/form/:id', auth, (req, res) => {
    const id = req.params.id;
    const idN = parseInt(id);

    const data = req.body;

    if(idN === null || idN === undefined || idN.length <= 0){
        res.statusCode = 400;
        res.send("ID inválido");
        return
    }

    database.select().where({id: idN}).table("form").then(response => {
        if(response.length < 1){
            res.statusCode = 404;
            res.send("Não encontrado");
            return
        };

        database.where({id: idN}).update({
            name: data.name,
            email: data.email,
            phone: data.phone,
            store: data.store,
            work: data.work,
            description: data.description,
            address: data.address,
            facebook: data.facebook,
            instagram: data.instagram
        }).table("form").then(response => {
            res.statusCode = 200;
            res.send("Alterado com sucesso");
    
        }).catch(err => {
            res.statusCode = 404;
            res.send("Erro");
        });
    });




});

module.exports = router;