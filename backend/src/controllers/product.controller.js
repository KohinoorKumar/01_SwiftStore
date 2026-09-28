import productModel from "../models/product.model.js"


export const createProductController = async (req, res) => {
    const filesUrls = []

    for (let i=0; i < req.files.length; i++){
        const response = await uploadFile({
            buffer: req.files[i].buffer,
            fileName: req.files[i].originalname
        })

        filesUrls.push(response.url)
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


export const updateProduct = async(req, res) => {
    const product = await productModel.findOneAndUpdate({_id: req.params.id})

    if(!product){
        return res.status(404).json({
            message: "Product not found or you do not own this product"
        });
    }

    return res.json({
        message: "Product updated", 
        data: {
            product
        }
    })
}

export const deleteProduct = async (req, res) => {
    const product = await productModel.findOneAndDelete({
        _id: req.params.id, createdBy: req.user._id
    });

    if (!product) {
        return res.status(404).json({
            message: "Product not found or you do not own this product"
        });
    }

    return res.json({
        message: "Product deleted successfully"
    })
}