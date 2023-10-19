
// const isAth =(req,res,next)=>{
//   const role =req.user.role;
//   console.log(role);
//   if(role ==="admin"){
//     next();
//   }else{
//     req.json({mesg:"detailea are only avilabe for admin"})
//   }
  
// }
// module.exports = {protectrout,isAth};

const jwt = require('jsonwebtoken');

const check = async (req, res, next) => {
    try {
        const key = req.cookies.isloged;
        if (key) {
            const verify = jwt.verify(key, process.env.JWT_SECRET);
            if (verify) {
                  next();
            } else {
                console.log("Verification failed");
                res.json({ message: 'Authentication failed' });
            }
        } else {
            console.log('No cookie received');
            res.json({ message: 'Authentication failed' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = check;
