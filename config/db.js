const mongoose= require('mongoose')
const dotenv= require('dotenv')
dotenv.config();

const connectToDatabase = async ()=>{
    try{
    mongoose.connect(process.env.DB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      console.log("Database is connected ")
      
    }
    catch(error){
        console.log(error);
        console.log("Database is not connected");
    }
}
module.exports=connectToDatabase;
 