
const { default: Personal } = require("@/models/personal");
const { default: resError } = require("@/utils/resError");
const { verify } = require("jsonwebtoken");
const { NextResponse } = require("next/server");

const userAuthGuard = async (req) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { id } = verify(token, process.env.JWT_SECRET);
            const data = await Personal.findById(id).select("-password");
            if(!data){
                return resError(res, 400, "User not found.");
            }
            NextResponse.next();
        } catch(error) {
            return resError(error.message)
        }
    }else{
        return errorHandler(res, 400, "Invalid Token");
    }
}

export default userAuthGuard;