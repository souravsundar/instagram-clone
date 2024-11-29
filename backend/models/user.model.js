import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    email:{type:String},
    username:{type:String},
    password:{type:String}
})

export default mongoose.model.Users || mongoose.model("User",userSchema);
