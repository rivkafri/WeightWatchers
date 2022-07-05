const express = require('express');

router.get('/',async(req, res) => { 
    const user=req.currentUser;
    const business=await Business.find({
        name:user.name,
        password:user.password,
    })
    res.send(business);
});

module.exports = router;