const express = require("express");
const cors = require("cors");
const bodyParser= require("body-parser");
const mysql=require("mysql");
const axios=require("axios");

// const NewsRoutes= require("./Routes/index")
// const db = require("./config/Database");


const app = express();
const port = 3100;

// try {
//   await db.authenticate();
//   console.log('Database connected...');
// } catch (error) {
//   console.error('Connection error:', error);
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/',(req,res)=>{
    res.send ("welcome to my page")
})

// app.use('/news',NewsRoutes)

//Router  
// const routes = require("./Routes/Datepick");
// app.use('/Datepick',routes)


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database : "vetrikodi"
    
  });

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0] 
const Pages ='Front'

  
  // const defaultValue =  "2023-01-02";
  console.log(defaultValue);
  console.log(Pages);

  app.get('/getnews',(req,res)=>{ 
    const mysql = 'SELECT * FROM `e-paper` WHERE Date= ? AND Pagename=? ';
    con.query(mysql,[defaultValue,Pages],(err,result)=>{
      res.send(result);
      console.log(result);
    });
  });

 
  app.post('/postnews',(req,res)=>{
    const date = req.body.Date;
    // const pagename = req.body.Pagename;
    console.log(date);
    const mysql = 'SELECT * FROM `e-paper` WHERE Date= ? AND Pagename=?';
    con.query(mysql,[date,Pages],(err,out)=>{
    console.log(out); 
    
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": out}));
      
    });
    });

    app.post('/news',(req,res)=>{
      const Id = req.body.id
      console.log(Id);
      const mysql = 'SELECT * FROM `e-paper` WHERE id= ? ';
      con.query(mysql,[Id],(err,out)=>{
      console.log(out); 

        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": out}));
        
      });
      });  

      app.post('/pagenews',(req,res)=>{
        const date = req.body.Date;
        const pagename = req.body.Pagename;
        console.log(date);
        const mysql = 'SELECT * FROM `e-paper` WHERE Date= ? AND Pagename=?';
        con.query(mysql,[date,pagename],(err,out)=>{
        console.log(out); 
        
          if(err) throw err;
          res.send(JSON.stringify({"status": 200, "error": null, "response": out}));
          
        });
        });
    

 
  

app.listen(port,()=>{
    console.log("server is running port:" + port);
})

