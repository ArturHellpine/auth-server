import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    hashPassword: {type: String, required: true}
})

export default mongoose.model('User', UserModel)