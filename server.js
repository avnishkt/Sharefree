const express =require('express');
const session = require('express-session');
const app = express();
const port = 8001;
const ejs= require('ejs');
const path =require('path');
const cookieParser = require('cookie-parser');
app.use(express.json());

app.use(express.static(__dirname + '/public'))
const cors = require('cors');
const corsOptions = {
//   // origin: process.env.ALLOWED_CLIENTS.split(',')
//   // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']


// // Default configuration looks like

    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:8001'); // Change this to the appropriate origin
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   next();
  // });

app.use(cors(corsOptions))


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

app.use(
    session({
      secret: 'your-secret-key', // Change this to a secure random string
      resave: false,
      saveUninitialized: true,
    })
  );

app.get('/',async(req,res)=>{
    
    await res.render('upload')

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
