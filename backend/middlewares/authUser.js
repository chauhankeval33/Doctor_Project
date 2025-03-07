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
