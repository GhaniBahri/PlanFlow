import express from "express";
import req from "express/lib/request";
import UserSchema from "../models/user"

const router = express.Router()

const userRoutes = () => {
    router.post('/register', async (req, res, next)=>{
        try {
            const user = new UserSchema({
                fullName : req.body.fullName,
                email: req.body.email,
                password: req.body.password
            })
            const savedUser = await user.save() //the function that saves the data in mongodb
            //later wew will add verification if the user exists
            if(savedUser) return res.json({success: true})
            return next(new Error ('Failed to save user for Unkown reasons'))
        } catch (error) {
            return next(error)
        }
    })

    return router
}

export default userRoutes