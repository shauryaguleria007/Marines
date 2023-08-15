const { createProduct,
    uploadFile,
    addFileData,
    getAllProducts,
    getProductsById
} = require('../controller/productController')

const { routeCredentialValidator } = require("../middleware/routeCredentialValidator")
const { upload } = require("../utility/GridFsStorage")

const passport = require("passport")
const express = require("express")

const { check } = require("express-validator")


const Router = express.Router()


Router.route("/addproduct").post(
    passport.authenticate(["sellerJwtStrategy"], { session: false }),
    [
        check("name").exists().isLength({ min: 3, max: 50 }),
        check("stock").exists().isInt({ gt: 0 }),
        check("price").exists().isInt({ gt: 0 }),
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

Router.route("/info/:productId").get([
    check("productId").exists().isMongoId()
], routeCredentialValidator, getProductsById)
module.exports = Router