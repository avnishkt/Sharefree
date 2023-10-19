const express =require('express');
const session = require('express-session');
const app = express();
const port = 8001;
const ejs= require('ejs');
const path =require('path');
const cookieParser = require('cookie-parser');
app.use(express.static('public'))


app.use(cookieParser());

const template_path = path.join(__dirname, "./views");
app.set("view engine", "ejs");
app.set("views", template_path);

const router = require('./routes/user')
const router2 = require('./routes/file')
const router3 =require('./routes/display')
const router4 =require('./routes/download')


app.use('/api/',router);
app.use('/api/',router2);
app.use('/files',router3);
app.use('/files/download',router4)

app.use(express.json());
app.use(
    session({
      secret: 'your-secret-key', // Change this to a secure random string
      resave: false,
      saveUninitialized: true,
    })
  );

app.get('/',async(req,res)=>{
    
    await res.send(`commplete the project with learning no need to go fast jusdt learn the things ${username}`)

})


app.get("/login", (req, res) => {
    res.render("login.ejs");
})
app.get("/sig", (req, res) => {
    res.render("signup.ejs");
})


const File= require('./model/file');
const person= require('./model/person');

const connectToDatabase=require('./config/db');
connectToDatabase();



app.listen(port,()=>{ console.log(`srever is connected and running on ${port}`)})
