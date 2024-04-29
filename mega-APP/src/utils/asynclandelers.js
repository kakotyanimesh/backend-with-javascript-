const asynclandelers = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asynclandelers}


// const asynchandelers = () => {}
// const asynchandelers = (fn) => async {() => {}}
// we basically removing the {} from the line below 

// const asynchandelers = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//     res.status(err.code || 500).json({
//         success: false,
//         message: err.message,
//     })
//     }
// }