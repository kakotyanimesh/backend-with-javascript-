import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const videoSchema = new Schema({

    videoFile: {
        type: String,
        required: [true, "video is required"]
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }


},{timestamps: true})


videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)


// import mongoose, { Schema } from "mongoose"
// import mongooseAggregatePagination from "mongoose-aggregate-paginate-v2"

// const videoSchema = new Schema({
//     videoFile: {
//         type: String,
//         required: [true, "video file is required"]
//     },
//     thumbnail: {
//         type: String,
//         required: [true, "rhumbnail is required"]
//     },
//     owner: {
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     },
//     title: {
//         type: String,
//         required: [true, "provide title"]
//     },
//     description: {
//         type: String,

//     },
//     duration: {
//         type: Number,
//         required: true
//     },
//     views: {
//         type: Number,
//         default: 0
//     },
//     isPublished: {
//         type: Boolean,
//         default: true
//     }
// },
// {
//     timestamps: true
// })


// videoSchema.plugin(mongooseAggregatePagination)

// export const Video = mongoose.model("Video", videoSchema)