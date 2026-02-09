const express = require("express");
const fs = require("fs");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const API_URL = "https://ogaviral.com/api/v2";
const API_KEY = "YOUR_API_KEY";

// DB FILES
if (!fs.existsSync("users.json")) fs.writeFileSync("users.json","[]");
if (!fs.existsSync("orders.json")) fs.writeFileSync("orders.json","[]");

const loadUsers = ()=> JSON.parse(fs.readFileSync("users.json"));
const saveUsers = d => fs.writeFileSync("users.json", JSON.stringify(d,null,2));

// REGISTER
app.post("/register",(req,res)=>{
  let users = loadUsers();
  const {email,password} = req.body;
  if(users.find(u=>u.email===email)) return res.send({error:"User exists"});
  users.push({email,password,balance:0,promo:false});
  saveUsers(users);
  res.send({success:true});
});

// LOGIN
app.post("/login",(req,res)=>{
  let users = loadUsers();
  const {email,password} = req.body;
  const user = users.find(u=>u.email===email && u.password===password);
  if(!user) return res.send({error:"Wrong login"});
  res.send(user);
});

// PROMO CODE
app.post("/promo",(req,res)=>{
  let users = loadUsers();
  const {email,code} = req.body;
  const user = users.find(u=>u.email===email);

  if(!user) return res.send({error:"User not found"});
  if(user.promo) return res.send({error:"Promo already used"});
  if(code !== "EMMZYNG") return res.send({error:"Invalid promo code"});

  user.balance += 50000;
  user.promo = true;
  saveUsers(users);

  res.send({success:true,balance:user.balance});
});

app.listen(3000, ()=>console.log("RUNNING ON http://localhost:3000"));
