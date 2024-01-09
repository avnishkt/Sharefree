const file = require('../model/file');
const person  = require('../model/person');

const multer = require('multer');
const { v4: uuid4 } = require('uuid');
const path = require('path');
const share =require('../utils/sendMailShare')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 } 
}).single('myfile');
const uploadFile = async (req, res) => {
  try {
      await new Promise((resolve, reject) => {
          upload(req, res, async (err) => {
              if (!req.file) {
                  reject({ error: "All fields required." });
              } else if (err) {
                  reject({ error: err.message });
              } else {
                  const uploadedFile = await file.create({
                      filename: req.file.filename,
                      uuid: uuid4(),
                      path: req.file.path,
                      size: req.file.size,
                      createdby: req.user // Assuming req.user contains the user ID
                  });

                  // Automatically update the user's reference to the newly uploaded file
                  const user = await person.findById(req.user);
                   console.log(req.user);
                  if (user) {
                      if (!user.files_created) {
                          user.files_created = [];
                          console.log(1);
                      }
                      user.files_created.push(uploadedFile._id);
                      console.log(2);
                      await user.save();
                  }

                  resolve({
                      filename: req.file.filename,
                      uuid: uploadedFile.uuid,
                      path: req.file.path,
                      size: req.file.size
                  });
              }
          });
      });

      res.json({
          file: `https://freeshare-wtba.onrender.com/files/${response.uuid}`
      });
  } catch (error) {
      return res.status(500).send({ error: error.message });
  }
};



const download =async (req,res ,)=>{
    try{
    const fle= await file.findOne({uuid:req.params.uuid});
    if(!fle){
       return res.render('download',{error:'file expired'})
// return res.json({mess: errorinloading});
    }
    return res.render('download',{
        uuid:fle.uuid,
        fileName: fle.filename,
        fileSize: fle.size,
        downloadLink:`https://freeshare-wtba.onrender.com/files/download/${fle.uuid}`

    })
}catch(err){
  // return  res.json({error:'something went wrong'})
  return res.render('download',{error:'something went wrong'})

}
};


const downloadFolder = async(req,res)=>{
    // Extract link and get file from storage send download stream 
    const f = await file.findOne({ uuid: req.params.uuid });
    // Link expired
    if(!f) {
         return res.render('download', { error: 'Link has been expired.'});
    } 
    const filePath = `${__dirname}/../${f.path}`;
    res.download(filePath);
  }

  const sendFile = async (req,res)=>{
    const { uuid, emailTo, emailFrom, expiresIn } = req.body;
    if(!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ error: 'All fields are required except expiry.'});
    }
    // Get data from db 
    try {
      const fileObt = await file.findOne({ uuid: uuid });
      // if(fileObt.sender) {
      //   return res.status(422).send({ error: 'Email already sent once.'});
      // }
      fileObt.sender = emailFrom;
      fileObt.receiver = emailTo;
      const response = await fileObt.save();
      // send mail
      share({
        from: emailFrom,
        to: emailTo,
        subject: 'Freeshare file sharing',
        text: `${emailFrom} shared a file with you.`,
        html: require('../utils/emailTemplate')({
                  emailFrom, 
                  downloadLink: `https://freeshare-wtba.onrender.com/files/${fileObt.uuid}?source=email` ,
                  size: parseInt(fileObt.size/1000) + ' KB',
                  expires: '24 hours'
              })
      }).then(() => {

        return res.json({success: true});
      }).catch(err => {
        return res.status(500).json({error: 'Error in email sending.'});
      });
  } catch(err) {
    console.log(err);
    return res.status(500).send({ error: 'Something went wrong.'});
  }
  
  };
module.exports = { uploadFile,
download ,
downloadFolder,
sendFile};
