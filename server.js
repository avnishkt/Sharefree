const express =require('express');
const session = require('express-session');
const app = express();
const port = 8001;
const passport= require('passport')
const ejs= require('ejs');
const path =require('path');
const check =require('./utils/jwt')
const cookieParser = require('cookie-parser');
app.use(express.json());
require('./config/passport')(passport);

app.use(express.static(__dirname + '/public'))
const cors = require('cors');
const corsOptions = {


    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  

app.use(cors(corsOptions))
app.use(
  session({
    secret: process.env.SECRET, // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

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



app.get('/',async(req,res)=>{
  console.log(req.session.username);
 
    
    await res.render('upload')

})
app.get('/auth',
  passport.authenticate('google', { scope: ['profile', 'email'],
	includeGrantedScopes: true,
	prompt: 'select_account'}));

app.get('/auth/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect('/');
  });


app.get('/log',(req,res)=>{
  res.render('logout.ejs');
})
// app.get('/dashboard', (req, res) => {
//   // Check if the user is authenticated
  
//   // Pass user details to the dashboard template
//   res.render('home.ejs', { user: req.user });
// });

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
