import {body, validationResult} from "express-validator"

export const createProductValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim()
        .isLength({min:2, max:100}).withMessage("Title length must be between 2 to 100 characters").bail()
        .isAlpha("en-US",{ignore:" -"}).withMessage("Title can only have english small case and capital case character"),
    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string").bail()
        .isLength({min:20, max:200}).withMessage("Description length must be between 20 to 200 characters").bail()
        .trim(),
    body("price.amount")
        .exists().withMessage("Price amount is required").bail()
        .isNumeric().withMessage("Price amount must be a number").bail()
        .isFloat({min:0}).withMessage("Price amount must be greater than 0").bail(),
    body("price.currency")
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("Currency must be a string").bail()
        .isIn(["INR", "USD"]).withMessage("Currency must be either INR or USD").bail(),
    body("sizes")
        .exists().withMessage("Sizes are required").bail()
        .isArray().withMessage("Sizses must be an array of objecct"),
    body("sizes.*.size")
        .exists().withMessage("Size must be present in every entry of sizes array").bail()
        .isString().withMessage("Size must be a string value").bail()
        .trim()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Size can be one of these XS, S, M, L, XL, XXL"),
    body("sizes.*.stock")
        .exists().withMessage("stock must be present in every entry of the sizes array").bail()
        .isInt({min: 0}).withMessage("Stock must be a integer value").bail(),
    (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid Request",
                errors: errors.array()
            })
        }

        next()
    }
]