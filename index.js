let db = require("./database/database")
let cors = require("cors")
let express = require("express")
let app = express()
app.use(cors())
app.use(express.json())

app.get('/api/todolist',(req,res)=>{
    db.query("select * ,  datediff(curdate(),task_date)as dateDiff from todolist order by task_id desc ",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            let modifyresults = result.map(tododata=>{
                let date = new Date(tododata.task_date)
                let dateformat = date.toISOString().split("T")[0]
                return {...tododata,task_date:dateformat}
            })
            console.log(modifyresults)
            res.json(modifyresults)
        }
    })
})

app.post('/insert',(req,res)=>{
    let {taskName,description}=req.body
    console.log(req.body)
    let insertQuery = "INSERT INTO todolist (task_name,task_description,task_status) values(?,?,?)"
    db.query(insertQuery,[taskName,description,0],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Inserted successfully")
            res.json(result)
        }
    })
})

app.delete("/delete/:id",(req,res)=>{
    let id = req.params.id;
    console.log(id)
    let deleteQuery="delete from todolist where task_id = ?"
    db.query(deleteQuery,[id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("deleted successfully",id)
            res.send("Updated Successfully")
        }
    })
})

app.post("/complete/:id",(req,res)=>{
    let id  = req.params.id
    let status = 1
    let completeQuery="update todolist set  task_status=? where task_id=?"
    db.query(completeQuery,[status,id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Status is set successfully",id)
            res.json(result)
        }
    })
})


app.get("/pending/count",(req,res)=>{
    db.query("select count(*) as count from todolist where task_status= 0",(err,results)=>{
        if(err){
            console.log(err)
        }else{
            // console.log()
            res.json(results)
        }
    })
})
app.get("/completed/count",(req,res)=>{
    db.query("select count(*) as count from todolist where task_status=1 ",(err,results)=>{
        if(err){
            console.log(err)
        }else{
            // console.log()
            res.send(results)
        }
    })

})

app.get("/pending/data",(req,res)=>{
    db.query("select * from todolist where task_status=0 order by task_id desc",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Pending data fetching successfullly")
            let modifyresults = result.map((data)=>{
                let date = new Date(data.task_date)
                let dateFormat = date.toISOString().split("T")[0]
                return {...data,task_date:dateFormat}
            })
            res.json(modifyresults)
        }
    })
})
app.get("/completed/data",(req,res)=>{
    db.query("select * from todolist where task_status=1 order by task_id desc",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            let modifyresults = result.map((data)=>{
                let date = new Date(data.task_date)
                let dateFormat = date.toISOString().split("T")[0]
                return{...data,task_date:dateFormat}
            })
            console.log(result)
            res.json(modifyresults)
        }
    })
})

app.get("/datediff/:id",(req,res)=>{
    let id =req.params.id
    db.query("select datediff(curdate(),task_date) as dateDiff from todolist where task_id  = ?",[id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("date diff is set correctly ")
            res.json(result)
        }
    })
})
app.put("/update/:id",(req,res)=>{
    let {id}=req.params
    let {updateDescription} = req.body
    db.query("update todolist set task_description =? where task_id=?",[updateDescription,id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("updated successfully")
            res.json(result)
        }
    })
})
app.listen(2030,(err,result)=>{
    if(err){
        console.log(err)
    }else{
        console.log("your port is running successfully on 2030")
    }
})