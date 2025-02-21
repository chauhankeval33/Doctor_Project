import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken";



//api to register 

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //validste the input
        if (!name || !email || !password) {
            return res.json({ success: false, message: "missing details" })
        }
        //validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter the valid email" })
        }
        //validate password
        if (password.length < 8) {
            return res.json({ success: false, message: "password should be at least 8 characters long" })
        }
        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
//api for user login

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "invalid credantials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export { registerUser, loginUser }