import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"


export const createProductController = async (req, res) => {
    const filesUrls = []

    for (let i=0; i < req.files.length; i++){
        const imageUrlString = await uploadFile({
            buffer: req.files[i].buffer,
            fileName: req.files[i].originalname
        })

        filesUrls.push(imageUrlString)
    }

    const product = await productModel.create({
        title: req.body.title,
        description: req.body.description,
        price: {
            amount: req.body.price.amount,
            currency: req.body.price.currency
        },
        sizes: req.body.sizes,
        images: filesUrls,
        createdBy: req.user._id
    })

    res.status(201).json({
        message: "Product created successfully",
        data: {
            product
        }
    })
}


export const getAllProductController = async ( req, res) => {

    // if (!req.user || !req.user._id) {
    //     return res.status(401).json({
    //         message: "Unauthorized access: User session missing."
    //     });
    // }

    const products = await productModel.find()
    res.status(200).json({
        message: "Products data fetched successfully",
        data: {
            products
        }
    })
}

export const getProductById = async (req, res) => {
    const product = await productModel.findById(req.params.id)

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    return res.json({ product });
}


export const updateProductController = async(req, res) => {
    try {
        
        const {id} = req.params

        const product = await productModel.findOne({
            _id: id,
            createdBy: req.user._id,
        })

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found or you are not authorized to update it",
            });
        }

        const {title, description, price, sizes, existingImages} = req.body;

        const keptImages = existingImages ?? product.images

        const newImageUrls = [];

        if(req.files && req.files.length > 0) {

            for (let i=0; i < req.files.length; i++){
                const imageUrlString = await uploadFile({
                    buffer: req.files[i].buffer,
                    fileName: req.files[i].originalname
                })

                newImageUrls.push(imageUrlString)
            }
        }

        const finalImages = [
            ...keptImages,
            ...newImageUrls,
        ]

        if(finalImages.length > 5) {
            return res.status(400).json({
                success: false,
                message: "A product can have at most 5 images",
            })
        }

        product.title = title ?? product.title;
        
        product.description = description ?? product.description

        product.price = price ?? product.price;
        
        product.sizes = sizes ?? product.sizes;

        product.images = finalImages;

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
        })


    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}


export const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productModel.findOne({
      _id: id,
      createdBy: req.user._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or you are not authorized to delete it",
      });
    }

    // Later:
    // Delete product.images from ImageKit here

    await productModel.deleteOne({
      _id: product._id,
    });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      productId: product._id,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyProductsController = async (req, res, next) => {
  try {
    const products = await productModel
      .find({
        createdBy: req.user._id,
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    next(error);
  }
};