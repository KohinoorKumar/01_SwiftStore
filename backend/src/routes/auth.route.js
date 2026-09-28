import {Router} from 'express'
import { getMeController, refreshTokenController, userLoginController, userRegisterController } from '../controllers/auth.controller.js'

const router = Router()

/**
 * @method POST
 * @route   /api/auth/register
 * @access  Public
 * 
 * @param   {Object} req - Express request object
 * @param   {Object} req.body - {name, email, password, confirmPassword}
 * 
 * @response res.status = 201 (if successful)
 */
router.post("/register", userRegisterController)

/**
 * @method  POST
 * @route   /api/auth/login
 * @access  Public
 * 
 * @param   {Object} req - Express request object
 * @param   {Object} req.body - { email, password, confirmPassword}
 * 
 * @returns res.status = 200 (if successful)
 */
router.post("/login", userLoginController)


router.post("/refresh-token", refreshTokenController)


router.post("/me", getMeController)



export default router