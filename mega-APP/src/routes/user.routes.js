import { Router } from "express"
import { logIn, logout, registerUser } from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middlewares.js"
import { varifyJwt } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)


    router.route("/login").post(logIn)

    router.route("/logout").post(varifyJwt, logout)



export default router