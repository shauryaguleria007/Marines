const { ProductModal } = require("../modal/productModel")
const { RouterAsyncErrorHandler } = require("../middleware/ErrorHandler/MiddlewareErrorHandlers")
const { Router } = require("express")
const mongoose = require("mongoose")

exports.createProduct = RouterAsyncErrorHandler(async (req, res, next) => {
    const { price, stock, name, description } = req.body
    console.log(req.user);
    const sellerId = req.user.id
    const product = await ProductModal.create({ price, stock, name, description, seller: sellerId })
    if (!product) throw new Error()
    res.json({ id: product.id })
})

exports.getAllProducts = RouterAsyncErrorHandler(async (req, res, next) => {
    const { sellerId } = req.query

    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 0
    const skip = Number(req.query.page) ? (Number(req.query.page) - 1) * limit : 0
    const filter = sellerId ? { seller: new mongoose.Types.ObjectId(sellerId) } : {}
    const product = await ProductModal.find(filter).skip(skip).limit(limit)
    if (!product || product.length === 0) throw new Error()
    res.json(product)
})

exports.getProductsById = RouterAsyncErrorHandler(async (req, res, next) => {

})

exports.addFileData = RouterAsyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await ProductModal.findById(id)
    if (!product) throw new Error()
    req.product = product
    next()
})

exports.uploadFile = RouterAsyncErrorHandler(async (req, res, next) => {
    req.files?.image.map(image => req.product.images.push(image.id))
    await req.product.save()
    res.json(req.product.images)
})