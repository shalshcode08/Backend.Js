
// doing the same thing in promise 
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err)=> next(err))
    }
}

export {asyncHandler}

// const asyncHandler = (fn)=> async(ewq, res, next) => {
//     try {
//         await fn(req, res, next)

//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message : error.message
//         })
        
//     }
// }

