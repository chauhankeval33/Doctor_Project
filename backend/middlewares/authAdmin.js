import jwt from 'jsonwebtoken'

//admin ahuthentication logic
const authAdmin = (req,res,next)=>{
    try {
        const {atoken} = req.headers
        if (!atoken) {
          return res.json({ success: false, message:"not authorazation login again:"})
        }
        const decoded = jwt.verify(atoken,process.env.JWT_SECRETE)

        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message:"not authorazation login again:"})
        }
        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message:error.message})
    }
}
export default authAdmin;