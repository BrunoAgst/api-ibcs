const express = require('express');
const router = express.Router();

router.post('/v1/auth', async (req, res) => {

    const {email, password} = req.body; 

});

module.exports = router;