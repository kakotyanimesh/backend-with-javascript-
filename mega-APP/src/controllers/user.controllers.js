import {asynclandelers} from "../utils/asynclandelers.js"


const registerUser = asynclandelers(async (req, res) => {
     return res.status(200).json({
        message: "routes is doing file"
    })
})

export {registerUser}