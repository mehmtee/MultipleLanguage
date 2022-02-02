const mongose = require('mongoose');
const userSchema = mongose.Schema({
 
    password: {
        type: String,
        required: true,
        minlenght: 7,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required:true,
        minlenght: 7,
        trim:true,
    },
    accountType : {
        type : String
    }
})
const User = mongose.model('User', userSchema)
module.exports = User
