// fil för vår node-kod

//Importerar moduler
const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");


//applikationsvariabel
const app = express();

app.use(("/public"),express.static(__dirname + "/public"));

app.get("/createuser", function(req, res){
    //Manuellt tillverka en ny användare

    let user = {};
    user.email = "demo@krati.se";
    user.id = Date.now();

    let tmpPassword = "StefanochJimmy=false";

    bcrypt.genSalt(10, function(err,salt){
        if(err) throw err;
        console.log(salt);

        bcrypt.hash(tmpPassword, salt, function(err, hash){
            if(err) throw err;
            console.log(hash);

        res.send("hello new user");

        //uppdatera vår användare

        user.password =hash;
        saveUser(user);
        });


    });



});




let port = process.env.port || 2006

app.listen(port,function(){
    console.log("app lyssnar på port "+port);


});


//hjälpfunktioner

function saveUser(userObj){
    //const users = Array.from(require("./.data/users.json"));
    let users = "";
    fs.readFile("./.data/users.json", function(err, data){
        let tmpData = data.toString();
        tmpData = JSON.parse(tmpData);
        users = Array.from(tmpData);
        
    
    console.log(users);
    users.push(userObj);

    fs.writeFile("./.data/users.json",JSON.stringify(users,null,2),function(){
        if(err) console.log("no user added");
        else console.log("user added");

    });

});
}