import express from "express"
import multer from "multer";
import { BadRequestError } from "../../../errors/bad-request-error";

import { CreateProductImage, CreateSlipImage } from "./assets.controller";
const router = express();

const upload = multer({
    dest: 'public/products',
    fileFilter(req, file, cb) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new BadRequestError("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
})
const uploadSlip = multer({
    dest: 'public/slips',
    fileFilter(req, file, cb) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new BadRequestError("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
})

router.post('/products',upload.single("asset"),CreateProductImage)
router.post('/slips',uploadSlip.single("asset"),CreateSlipImage)

export { router as AssetsRoute }