
const { default: Personal } = require("@/models/personal");
const { verify } = require("jsonwebtoken");

const userAuthGuard = async (req) => {
        try {
            const headers = req.headers;
    const token = headers.get('authorization').split(" ")[1];
            const { id } = verify(token, process.env.JWT_SECRET);
            const data = await Personal.findById(id).select("-password");
            return {success: true, message: "Token verified", data};
        } catch(error) {
            return {success: false, message: "Invalid Token - Login Again"};
        }
}

export default userAuthGuard;