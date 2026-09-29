import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const createAccessToken = (userId) => {
    return jwt.sign({id: userId.toString()}, config.ACCESS_TOKEN_SECRET, {expiresIn: "15Min"})
}

export const createRefreshToken = (userId) => {
    return jwt.sign({id: userId.toString()}, config.REFRESH_TOKEN_SECRET, {expiresIn: "15Min"})
}

export const readRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET)
}

export const readAccessToken = (accessToken) => {
    return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
}