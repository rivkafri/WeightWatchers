const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;
const router = express.Router();
fsPromises.readFile('../users.json', 'utf8');

let users;
router.get('/', (req, res) => {
    fs.promises.readFile('../users.json')
        .then(function (result) {
            res.send(result);
            console.log(JSON.parse(result).users);
        })
        .catch(function (error) {
            console.log(error);
        }) 
});


module.exports = router;




