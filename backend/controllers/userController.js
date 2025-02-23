import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";


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

//api to get the userdata

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body 
        const userData = await userModel.findById(userId).select('-password');
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "data missing" })
        }

        //console.log(userId + " " + name + " " + phone + " " + address + " " + dob + " " + gender)

        const updatedUser1 = await userModel.findOneAndUpdate(
            { _id: userId },
            { name, phone, address: JSON.parse(address), dob, gender },
            { new: true, runValidators: true }
        );

        //console.log(updatedUser1)

        // const updatedUser1 = await userModel.findByIdAndUpadate(
        //     userId,
        //     { name, phone, address: JSON.parse(address), dob, gender },
        //     { new: true }
        // )

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            const updatedUser2 = await userModel.findOneAndUpdate(
                { _id: userId },
                { image: imageURL },
                { new: true, runValidators: true }
            );

           // console.log(updatedUser2);

            // const updatedUser2 = await userModel.findByIdAndUpdate(
            // userId,
            // { image: imageURL },
            // { new: true }
            // );

        }
        res.json({ success: true, message: "profile updated:" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export { registerUser, loginUser, getProfile, updateProfile }