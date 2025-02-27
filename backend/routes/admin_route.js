import express from "express"
import { addDoctor, adminLogin, allDoctor, appointmentAdmin } from "../controllers/admin_controller.js"
import upload from "../middlewares/multer.js"
import authAdmin from "../middlewares/authAdmin.js"
import { changeAvailablity } from "../controllers/doctor_controller.js"

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)

adminRouter.post('/login', adminLogin)

adminRouter.post('/all-doctors', authAdmin, allDoctor)

adminRouter.post('/change-availability', authAdmin, changeAvailablity)

adminRouter.get('/appointments', authAdmin, appointmentAdmin)
export default adminRouter;