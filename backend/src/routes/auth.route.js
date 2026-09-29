import {Router} from 'express'
import { getMeController, logoutController, refreshTokenController, userLoginController, userRegisterController } from '../controllers/auth.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'
import { userLoginValidator, userRegisterValidator } from '../validators/auth.validators.js'

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
router.post("/register", userRegisterValidator,  userRegisterController)

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
router.post("/login", userLoginValidator, userLoginController)


router.post("/refresh-token", refreshTokenController)


router.get("/me",  authenticate, getMeController)

router.post("/logout", logoutController);


export default router