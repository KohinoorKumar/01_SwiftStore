import {Router} from 'express'
import multer from 'multer'
import { authenticate } from '../middlewares/auth.middleware.js'
import { createProductController, deleteProductController, getAllProductController, getMyProductsController, getProductById, updateProductController} from '../controllers/product.controller.js'
import { createProductValidator } from '../validators/product.validator.js'


const router = Router()
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 5,
        fileSize: 1 * 1024 * 1024
    }
})
/**
 * @method POST
 * @route /api/products/
 * @description create the product and save its data into the DB, images will be store on imageKit.
 * @access user
 * req.body => {title, description, price:{amount, currency}, sizes:[{size,stock}, {size, stock}]}
 */
router.post("/", authenticate, 
    upload.array("images"),
    (req,res,next) => {
        req.body?.price && (req.body.price = JSON.parse(req.body.price))
        req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

        next()
    },
    createProductValidator,
    createProductController)

/**
 * @method GET
 * @route /api/product
 * @description Read all product from the DB
 * @access user
 */
router.get("/", getAllProductController)

router.get("/my-products", authenticate, getMyProductsController)

router.get("/:id", getProductById)

router.put(
  "/:id",
  authenticate,
  upload.array("images", 5),
  (req, res, next) => {
    req.body?.price &&
      (req.body.price = JSON.parse(req.body.price));

    req.body?.sizes &&
      (req.body.sizes = JSON.parse(req.body.sizes));

    req.body?.existingImages &&
      (req.body.existingImages = JSON.parse(req.body.existingImages));

    next();
  },
  updateProductController
);


router.delete("/:id", authenticate, deleteProductController)
export default router
