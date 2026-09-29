import { readAccessToken } from "../utils/auth.util.js"


export const authenticate = async(req, res, next) => {

    const accessToken = req.headers.authorization?.split(" ")[1]
    console.log("Auth Header", req.headers.authorization)

    if(!accessToken) {
        return res.status(400).json({
            message: "Access token not found in the request header"
        })
    }

    try {
        const decoded = readAccessToken(accessToken)

        req.user = {
            _id: decoded.id
        }

        next()
    } catch(error) {
        return res.status(401).json({
            message: "Invalid or expired access token"
        })
    }
}