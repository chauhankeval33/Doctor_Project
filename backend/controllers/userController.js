import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctor_model.js";
import appointmentModel from "../models/appointment_model.js";
import razorpay from "razorpay";


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

        const updatedUser1 = await userModel.findOneAndUpdate(
            { _id: userId },
            { name, phone, address: JSON.parse(address), dob, gender },
            { new: true, runValidators: true }
        );

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            const updatedUser2 = await userModel.findOneAndUpdate(
                { _id: userId },
                { image: imageURL },
                { new: true, runValidators: true }
            );

        }
        res.json({ success: true, message: "profile updated:" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to book appointment

const bookAppointment = async (req, res) => {
    try {

        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' })
        }

        let slots_booked = docData.slots_booked

        //checking for slot availabilty

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slot data in docData

        await doctorModel.findOneAndUpdate(
            { _id: docId },
            { $set: { slots_booked: slots_booked } },
            { new: true, runValidators: true }
        );

        res.json({ success: true, message: "Appointment Booked" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to get appointment

const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to cancel appointment

const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user

        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'unautorized user' })
        }

        await appointmentModel.findOneAndUpdate(
            { _id: appointmentId },
            { $set: { cancelled: true } }
        );

        //  releasing doctor slot

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter((time) => time !== slotTime)

        await doctorModel.findOneAndUpdate(
            { _id: docId },
            { $set: { slots_booked: slots_booked } }
        );
        res.json({ success: true, message: 'appointment cancelled' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Api to make payment of appointment using razorpay

const paymentRazorpay = async (req, res) => {

    try {
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            res.json({ success: false, message: "Appointment canceeled or not found" })
        }

        //creating options for razorpay payment

        const options = {
            amount: appointmentData.amount * 100, // converting amount to paisa
            currency: process.env.CURRENCY,
            receipt: appointmentData._id.toString()
        }
        //create of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === "paid") {
            await appointmentModel.findOneAndUpdate(
                { _id: orderInfo.receipt }, // Query to match the document by ID
                { payment: true },          // Update operation
                { new: true }               // Option to return the updated document (optional)
            );
            res.json({ success: true, message: "Payment successful" })
        } else {
            res.json({ success: false, message: "Payment failed" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay }   