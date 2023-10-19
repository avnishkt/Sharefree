const file = require('../model/file');
const multer = require('multer');
const { v4: uuid4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 } // Correct 'limit' to 'limits'
}).single('myfile');

const uploadFile = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (!req.file) {
          reject({ error: "All fields required." });
        } else if (err) {
          reject({ error: err.message });
        } else {
          resolve({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
          });
        }
      });
    });

    const response = await file.create({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size
    });

    return res.json({
      file: `${process.env.APP_base_URL}/files/${response.uuid}`
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
        downloadLink:`${process.env.APP_base_URL}/files/download/${fle.uuid}`

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

module.exports = { uploadFile,
download ,
downloadFolder};
