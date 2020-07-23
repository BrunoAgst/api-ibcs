const express = require('express');
const router = express.Router();
const database = require('../database/database');

router.get('/v1/form', (req, res) => {
    
    database.select().table("form").orderBy("id", "asc").then(data => {
        res.json(data);
    
    }).catch(err => {
        console.log(err);
        res.send("Error");
    
    });

});


module.exports = router;