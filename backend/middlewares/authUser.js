// import jwt from 'jsonwebtoken'

// //user ahuthentication midlleware
// const authUser = (req, res, next) => {
//     try {

//         const { token } = req.headers
//         if (!token) {
//             return res.json({ success: false, message: "not authorazation login again:" })
//         }
//         const token_decoded = jwt.verify(token, process.env.JWT_SECRETE)
//         req.body.userId = token_decoded.id
//         next()

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }
// export default authUser;
import jwt from 'jsonwebtoken';

// User authentication middleware
const authUser = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Bearer token format

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: Please log in again." });
        }

        // Verify the JWT token
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRETE);

        // Attach the user ID to the request
        req.body.userId = tokenDecoded.id;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

export default authUser;
