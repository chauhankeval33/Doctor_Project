import doctorModel from "../models/doctor_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointment_model.js";

const changeAvailablity = async (req, res) => {
    try {

        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "Availability changed successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
//API For Doctor Login

const loginDoctor = async (req, res) => {

    try {
        const { email, password } = req.body

        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {

            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRETE)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//API to get doctor appoinentment for doctor panel

const appointmentsDoctor = async (req, res) => {
    try {

        const { docId } = req.body

        console.log(docId);

        const appointments = await appointmentModel.find({ docId })

        console.log(appointments);

        res.json({ success: true, appointments })

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//API to make appointment completed for doctor panel

const appointmentComplete = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findOneAndUpdate(
                { _id: appointmentId }, // the filter to find the appointment
                { isCompleted: true },   // the update to be applied
                { new: true }            // optionally, return the updated document
            );

            res.json({ success: true, message: "Appointment Completed" });

        } else {
            return res.json({ success: false, message: "Mark Failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to cancel appointment for doctor panel

const appointmentCancel = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findOneAndUpdate(
                { appointmentId }, // the filter to find the appointment
                { cancelled: true },   // the update to be applied
                { new: true }            // optionally, return the updated document
            );

            res.json({ success: true, message: "Appointment Cancelled" });

        } else {
            return res.json({ success: false, message: "Cancellation Failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to get dashboard data for doctor panel

const doctorDashboard = async (req, res) => {
    try {

        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({ success: true, profileData })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to update the profile of doctor

const updateDoctorProfile = async (req, res) => {
    try {

        const { docId, fees, address, available } = req.body

        await doctorModel.findOneAndUpdate(
            { _id: docId }, // Query to find the document by _id
            {
                fees,         // Update the fees
                address,      // Update the address
                available,    // Update availability
            },
            {
                new: true,    // This ensures the returned document is the updated one
                runValidators: true, // Optional: ensures that the update passes schema validation
            }
        );
        res.json({ success: true, message: "Profile updated successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



export {
    changeAvailablity,
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
}