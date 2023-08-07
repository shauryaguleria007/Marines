const { createProduct,
    uploadFile,
    addFileData,
    getAllProducts
} = require('../controller/productController')

const { routeCredentialValidator } = require("../middleware/routeCredentialValidator")
const { upload } = require("../utility/GridFsStorage")

const express = require("express")
const passport = require("passport")

const { check } = require("express-validator")


const Router = express.Router()


Router.route("/addproduct").post([
    check("name").exists().isLength({ min: 3, max: 50 }),
    check("stock").exists().isInt({ gt: 0 }),
    check("price").exists().isInt({ gt: 0 }),
    check("sellerId").exists().isMongoId(),
    check("description").exists()
],
    routeCredentialValidator,
    createProduct)

Router.route("/upload/:id").post([
    check("id").exists().isMongoId()
],
    addFileData,
    upload.fields([{ name: "image" }]),
    uploadFile)


Router.route("/info/all").get([
    check("page").optional().isNumeric(),
    check("limit").optional().isNumeric(),
    check("sellerId").optional().isMongoId()
], routeCredentialValidator, getAllProducts)
module.exports = Router