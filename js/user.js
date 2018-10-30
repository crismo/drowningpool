var express = require('express')
var router = express.Router();
var db = require("./db.js");

router.get('/app/users',function(req,res,next){
    let query = "Select * from Users";
    let users = db.select(query);
    if(users){
        res.status(200).json(JSON.parse(users));
    }else{
        //????
    }
});

router.post('/app/user', async function(req,res,next){

    let userEmail = req.body.email;
    let userName = req.body.name;
    let paswordHash = req.body.pswHash;
    let userRole = req.body.userRole;

    let query = `INSERT INTO "public"."Users"("email", "username", "hash", "role") 
        VALUES('${userEmail}', '${userName}', '${paswordHash}', ${userRole}) RETURNING "id", "email", "username", "hash", "role"`;

    let code = await db.insert(query) ? 200:500;
    res.status(code).json({}).end()
})

router.get('/app/user/:userName',function(req,res,next){

    let paswordHash = req.body.pswHash;
    let userName = req.params["userName"];

    let query = `Select * from Users where userName='${userName}' 
    and hash='${paswordHash}'`;

    let user = db.select(query) ;

    if(user){
        res.status(200).json(user).end()
    } else{
        res.status(401).json({}).end();
    }
})






module.exports = router;