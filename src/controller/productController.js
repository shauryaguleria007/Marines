const { ProductModal } = require("../modal/productModel")
const { RouterAsyncErrorHandler } = require("../middleware/ErrorHandler/MiddlewareErrorHandlers")
const { Router } = require("express")
const mongoose = require("mongoose")

exports.createProduct = RouterAsyncErrorHandler(async (req, res, next) => {
    const { price, stock, name, description } = req.body
    const sellerId = req.user.id
    const product = await ProductModal.create({ price, stock, name, description, seller: sellerId })
    if (!product) throw new Error("s")
    res.json({ id: product.id })
})

exports.getAllProducts = RouterAsyncErrorHandler(async (req, res, next) => {
    const { sellerId } = req.query

    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 0
    const skip = Number(req.query.page) ? (Number(req.query.page) - 1) * limit : 0
    const filter = sellerId ? { seller: new mongoose.Types.ObjectId(sellerId) } : {}
    const product = await ProductModal.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 })
    if (!product || product.length === 0) throw new Error()
    res.json(product)
})

exports.getProductsById = RouterAsyncErrorHandler(async (req, res, next) => {
    const { productId } = req.params
    const product = await ProductModal.findById(productId)
    if (!product) throw new Error()
    res.json(product)
})

exports.addFileData = RouterAsyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await ProductModal.findById(id)
    if (!product) throw new Error("product")
    req.product = product
    next()
})

exports.uploadFile = RouterAsyncErrorHandler(async (req, res, next) => {
    if (!req.files) throw new Error()
    req.files?.image.map(image => req.product.images.push(image.id))
    await req.product.save()
    res.json(req.product.images)
})