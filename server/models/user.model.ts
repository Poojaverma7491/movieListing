import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firebaseUid: { 
        type: String, 
        unique: true, 
        index: true, 
        required: [true, "Provide firebaseUid"],
    },
    fullName : {
        type : String,
        required : [true,"Provide fullName"]
    },
    email : {
        type : String,
        required : [true, "provide email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "provide password"]
    },
    refresh_token : {
        type : String,
        default : ""
    }
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel
