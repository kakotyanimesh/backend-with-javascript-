import mongoose from "mongoose"

import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const connectak = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongo connected to host !!  host: ${connectak.connection.host}`);
    } catch (error) {
        console.log("moongodb error", error);
        process.exit(1)
    }
}

export default connectDB

// important => use async await and trycatche/ promises