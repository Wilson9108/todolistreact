let mysql = require("mysql2")

let db = mysql.createConnection({
    port:3306,
    host:"localhost",
    user:"root",
    password:"root123",
    database:"todolist"
})

db.connect((err,result)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Database Connected Successfully")
    }
})

module.exports =  db
