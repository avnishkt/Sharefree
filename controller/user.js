const person  = require('../model/person');
const bcrypt =require("bcrypt");
const mail =require('../utils/sendMail')
const jwt = require("jsonwebtoken");
const file = require('../model/file');




const createPerson = async (req, res) => {
    if (req.body.password !== req.body.password2) {
        res.redirect('/sig');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const newUser = await person.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // Automatically update the user's reference to files if available
        const userFiles = await file.find({ createdby: req.user });

        if (userFiles.length > 0) {
            newUser.files_created = userFiles.map(file => file._id);
            await newUser.save();
        }

        res.redirect('/login');
        mail(req.body.email);
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
};

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
            req.session.username = candidate.username
            //sending login token :- so that user can acces only authorized routes
           const token = jwt.sign({candidate},process.env.JWT_SECRET, { expiresIn: '1h' })
           res.cookie('isloged',token,{ httpOnly:true })

            console.log("you are welcome to the world of sharing")
            
            res.redirect('/')
        }else {
            res.json({error:passworderror})
        }

    }
    

    
    
}
const getuser = async (req, res) => {
    try {
        // Assuming you have a middleware that attaches user information to the request (e.g., req.user)
        const userId = req.user._id; // Adjust this based on how user information is stored in the request

        // Fetch user details
        const user = await person.findById(userId);

        // Fetch files associated with the user
        const files = await file.find({ createdby: userId });

        // Render the dashboard view with user and file data
        res.render('dashboard', { user, files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const logout = (req, res) => {
    // Clear the user's session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
  
      // Remove the login token cookie
      res.clearCookie('isloged');
  
      // Save the session
    //   req.session.save();
    res.clearCookie('connect.sid'); 

  
      // Redirect the user to the login page or any other appropriate page
      res.redirect('/login');
    });
  };
  

module.exports= {createPerson
,loginUser
,getuser 
,logout};

