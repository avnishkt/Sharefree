const mongoose= require('mongoose');


const personSchema= new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        minlength: 3,
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
        validate: {
            validator: function(value) {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address.`
        }

    },
    password:{
        type:String,
        // required:true
    }
    ,
    googleId:{
        type:String,


    }
    ,  files_created: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File', // Assuming 'File' is the name of the 'file' model
    }],
	date: {
		type: Date,
		default: Date.now
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	gmail: {
		type: String,
	},
	googleId: {
		type: String,
	},
	profilePic: {
		type:String
	}


})

module.exports= mongoose.model('person',personSchema);