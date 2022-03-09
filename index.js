const express=require("express");

const app=express();

const mysql=require("mysql2");

const multer=require("multer");

const upload=multer();

const bodyparser=require("body-parser");
 
let port=2020;

app.use=(express.json());

const db=mysql.createConnection({

    host:"localhost",
    user:"root",
    database:"internrecords",
    password:"",
    port:3306

});

db.connect((err)=>{

    if(err){
        console.log(err,"error");
    }
    else{
        console.log("databased connected");
    }
});

app.get("/:id",(req,res)=>{

    let id=req.params.id;
    
    let qry='SELECT * FROM `records` WHERE Rec_id="'+id+'"';

db.query(qry,(err,result)=>{
   
    if(err){
        console.log(err,"error");
     }
if(result.length > 0)
    {
res.send({status:true,msg:"database connected",data:result});
     }
     else{
         res.send({status:false,msg:"Failed"});
     }
});
});

app.post("/insert",upload.none(),(req,res)=>{
    let Intern_id=req.body.Intern_id;
    let Date=req.body.Date;
    let Content=req.body.Content;
    let Description=req.body.Description;
    let Mentor=req.body.Mentor;
    let Link=req.body.Link;

    let qry=`INSERT INTO records(Intern_id,Date, Content, Description, Mentor, Link) VALUES ('${Intern_id}','${Date}','${Content}','${Description}','${Mentor}','${Link}')`;

db.query(qry,(err,result)=>{
   
    if(err){
console.log(err);
    }
    console.log(result);
if(result.affectedRows > 0)
{
    res.send({status:"true",msg:"Database success",data:result});
}
else{
    res.send({status:"false",msg:"Failed"});
}
});
});

app.post("/add",upload.none(),(req,res)=>{
    let Intern_id=req.body.Intern_id;
    let Full_Name=req.body.Full_Name;
    let Application=req.body.Application;
    let Number=req.body.Number;
    let Email=req.body.Email;
    let Password=req.body.Password;

    let qry=`INSERT INTO users(Intern_id,Full_Name, Application, Number,Email, Password) VALUES ('${Intern_id}','${Full_Name}','${Application}','${Number}','${Email}','${Password}')`;

db.query(qry,(err,result)=>{
   
    if(err){
console.log(err);
    }
    console.log(result);
if(result.affectedRows > 0)
{
    res.send({status:"true",msg:"Database success",data:result});
}
else{
    res.send({status:"false",msg:"Failed"});
}
});
});





app.get("/:id",(req,res)=>{
   
    let Intern_id=req.params.Intern_id;
    
    let qry= 'FOREIGN KEY  (Intern_id)  REFERENCES records("'+Intern_id+'")';
    
    console.log(qry);

    db.query(qry,(err,result)=>{
   
        if(err){
            console.log(err,"error");
         }
    if(result.length > 0)
        {
    res.send({status:true,msg:"database connected",data:result});
         }
         else{
             res.send({status:false,msg:"Failed"});
         }
    });
    });
    
    app.listen(port,()=>{
        console.log("server is running ");
    
    
    });



//intern-id
//fullname
//application
//email
//password
//mobile
