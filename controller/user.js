const person  = require('../model/person');
const bcrypt =require("bcrypt");
const session = require('express-session');
const mail =require('../utils/sendMail')
const jwt = require("jsonwebtoken");




const createPerson = async(req,res)=>{
    // const {username,email,password} =req.body;
const salt= await bcrypt.genSalt(10);

    const password = await bcrypt.hash(req.body.password,salt)

    try{
        await person.create(
            {
                username:req.body.username,
                email:req.body.email,
                password:password

            }
        );
        res.json({success:true})
        mail(req.body.email);

    }
    catch(err){
        console.log(err);
       console.log("error at creating user") ;
       res.json({success:false});
    }
}

const loginUser= async (req,res)=>{
    const email= req.body.email;
    const candidate =await person.findOne({email});
    if(!candidate){
        console.log("cannot find the email")
        res.json("get registered first")

    }
    else{
        const match = bcrypt.compare(req.body.password,candidate.password);
        if(match){
            req.session.username =candidate.username
            //sending login token :- so that user can acces only authorized routes
           const token = jwt.sign({candidate},process.env.JWT_SECRET, { expiresIn: '1h' })
           res.cookie('isloged',token,{ httpOnly:true })

            res.json("you are welcome to the world of sharing")
        }

    }
    

    
    
}
const getuser = async (req,res)=>{
    res.send(`welcome `)
}

module.exports= {createPerson
,loginUser
,getuser };

