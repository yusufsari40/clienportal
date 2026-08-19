const express=require("express");
const path=require("path");
const app=express();
const PORT=process.env.PORT||3000;
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

let clients=[
 {id:1,name:"Demo Client",company:"Demo BV",status:"Actief",updated:"Vandaag"},
 {id:2,name:"Voorbeeld Klant",company:"Voorbeeld Studio",status:"Actief",updated:"Gisteren"}
];
let tasks=[{id:1,title:"Logo goedkeuren",client:"Demo BV",status:"Open"}];
let invoices=[{id:1,number:"INV-001",client:"Demo BV",amount:"€250,00",status:"Open"}];

app.get("/api/dashboard",(req,res)=>res.json({clients,tasks,invoices}));
app.post("/api/clients",(req,res)=>{const c={id:Date.now(),name:req.body.name||"Nieuwe klant",company:req.body.company||"",status:"Actief",updated:"Zojuist"};clients.push(c);res.status(201).json(c)});
app.post("/api/tasks",(req,res)=>{const t={id:Date.now(),title:req.body.title||"Nieuwe taak",client:req.body.client||"",status:"Open"};tasks.push(t);res.status(201).json(t)});
app.post("/api/invoices",(req,res)=>{const i={id:Date.now(),number:"INV-"+String(invoices.length+1).padStart(3,"0"),client:req.body.client||"",amount:req.body.amount||"€0,00",status:"Open"};invoices.push(i);res.status(201).json(i)});
app.get("/health",(req,res)=>res.json({ok:true}));
app.listen(PORT,()=>console.log("ClientPortal draait op http://localhost:"+PORT));