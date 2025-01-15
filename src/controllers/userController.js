import User from "../models/user.js"

const register = async (req, res, next)=>{
    try {
        const userExist = await User.findOne({email: req.body.email})
        if (userExist) return res.status(409).json({success: false, message: 'Email already used'})
        const user = new User({
            fullName : req.body.fullName,
            email: req.body.email,
            password: req.body.password
        })
        const savedUser = await user.save() //the function that saves the data in mongodb
        //later wew will add verification if the user exists
        if(savedUser) return res.json({success: true})
        // if(savedUser) return res.redirect('http://localhost:3000/dashboard')
        return next(new Error ('Failed to save user for Unkown reasons'))
    } catch (error) {
        return next(error)
    }
}

export {
    register
}