import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { createAccessToken, createRefreshToken, readRefreshToken } from "../utils/auth.util.js"


/**
 * @desc    Register a new user account and save the data in db from req.body
 *
 * @param   {Object} req - Express request object
 * @param   {Object} req.body - Request body data
 * @param   {string} req.body.name - User's full name
 * @param   {string} req.body.email - User's unique email address
 * @param   {string} req.body.password - User's plain text password
 * @param   {string} req.body.confirmPassword - Password confirmation match
 * 
 * @response {Object} 201 - Success response with token and user details
 * @response {Object} 400 - Validation errors (e.g., password mismatch, email taken)
 * @response {Object} 500 - Internal server error
 */
export const userRegisterController = async (req, res) => {
    try {
        const {name, email, password, confirmPassword} = req.body

        if(password !== confirmPassword) {
            return res.status(400).json({
                error: "Passwords do not match"
            })
        }
        
        const isUserExist = await userModel.findOne({email})
        if(isUserExist){
            return res.status(400).json({
                message: "User already exists with this email address",
                errors: {
                    field: "email",
                    message: "User already exists with this email address"
                } 
            })
        }

        const newUser = await userModel.create({
            name,
            email,
            passwordHash: await bcrypt.hash(password, 10),
        })

        const accessToken = createAccessToken(newUser._id)
        const refreshToken = createRefreshToken(newUser._id)

        newUser.refreshToken = refreshToken
        await newUser.save();

        res.cookie("refreshToken", refreshToken, {httpOnly: true})

        return res.status(201).json({
            message: "User registered successfully",
            data: {
                user: {
                    // 2. FIXED: Changed 'user' to 'newUser' to match your database variable name
                    email: newUser.email,
                    name: newUser.name,
                    id: newUser._id,
                },
                accessToken
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}


/**
 * @desc   Login user with email and password, and return access token and refresh token
 * @param   {Object} req - Express request object
 * @param   {Object} req.body - Request body data
 * @param   {string} req.body.email - User's unique email address
 * @param   {string} req.body.password - User's plain text password
 * 
 * @returns {Object} 200 - Success response containing user data and access token
 * @returns {Object} 400 - Missing email or password
 * @returns {Object} 401 - Invalid credentials (unauthorized email/password)
 * @returns {Object} 500 - Internal server error
 */
export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 2. Check for valid user with provided email
        const user = await userModel.findOne({ email }).select("+passwordHash");
        
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Add an extra safety check before running bcrypt to prevent crashes
        if (!user.passwordHash) {
            console.error(`Database error: User ${email} exists but has no password hash set.`);
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 3. Check for valid password with stored password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 4. Assign new access and refresh tokens
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id); 

        // 5. Update refresh token in db
        await userModel.findByIdAndUpdate(user._id, {
            refreshToken
        });

        // 6. Set refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        });

        // 7. Send success response back to the client
        return res.status(200).json({
            message: "User loggedIn Successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                accessToken
            }
        });

    } catch (error) {
        console.error("Login Server Error:", error); // Recommended: Logs the real crash details to your terminal
        return res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
};


/**
 * @desc  Refresh access token using refresh token from cookies
 * @param   {Object} req - Express request object
 * @param   {Object} req.cookies - Cookies object containing refresh token
 * @returns {Object} 200 - Success response containing new access token
 * @returns {Object} 401 - Unauthorized (invalid or missing refresh token)
 * @returns {Object} 500 - Internal server error
 */
export const refreshTokenController = async (req, res) => {
  try {
    console.log("COOKIES:", req.cookies);

    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized: No refresh token provided",
      });
    }

    const decoded = readRefreshToken(refreshToken);
    const { userId } = decoded;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    // IMPORTANT: no !
    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });

      return res.status(401).json({
        message: "Unauthorized: refresh token mismatch",
      });
    }

    const accessToken = createAccessToken(userId);
    const newRefreshToken = createRefreshToken(userId);

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    return res.status(200).json({
      message: "Tokens rotated successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error("REFRESH TOKEN ERROR:", error);

    return res.status(401).json({
      message: "Invalid refresh Token",
    });
  }
};

export const getMeController = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User profile record not found." });
        }

        return res.status(200).json({
            message: "User data fetched successfully", 
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                }
            }
        });
    } catch (error) {
        console.error("Hydration server breakdown:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logoutController = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};