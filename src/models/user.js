import mongoose  from "mongoose";
import emailValidator from "email-validator" 
import * as bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullName:{
        type : String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: {unique: true},
        validate: {
            validator: emailValidator.validate,
            message: props => `${props.value} is not valid`
        }
    },
    
},{timestamps: true,})

// userSchema.pre will execute the passed function before saving
UserSchema.pre('save', async function preSave(next) {
    const user = this
    if (!user.isModified('password')) return next(); // if it's modified pass to next 
    try{
        const hash = await bcrypt.hash(user.password, SALT_ROUNDS)
        user.password = hash
        return next()
    } catch(error){
        return next(error)
    }
})

UserSchema.methods.comparePassword = async function comparePassword(candidate) {// will add a function available for all documents to execute
     return bcrypt.compare(candidate, this.password)
} 
const User = mongoose.model('User', UserSchema)
export default User