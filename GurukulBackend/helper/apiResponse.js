const successResponse = function(res, statusCode, msg, data={}, role={}) {
    var resData = {
        status: true,
        message: msg,
        data: data,
        role: role
    };
    return res.status(statusCode).json(resData);
};

const ErrorResponse = function(res,statusCode, msg) {
    var resData = {
        status: false,
        message: msg || 'Something went to wrong',
    };
    return res.status(statusCode).json(resData);
};

const notFoundResponse = function(res, statusCode, msg) {
    var resData = {
        status: false,
        message: msg,
    };
    return res.status(statusCode).json(resData);
};

const validationErrorWithData = function(res, statusCode, msg, data={}) {
    var resData = {
        status: false,
        message: msg,
        data: data
    };
    return res.status(statusCode).json(resData);
};

const unauthorizedResponse = function(res, statusCode, msg) {
    var resData = {
        status: false,
        message: msg,
    };
    return res.status(statusCode).json(resData);
};

// const statusCodes = {
//     "Success" : 200,
//     "serverError" : 500,
//     "forbidden" : 403
// }

// const message = {
//     dataAdded :(val)=>`${val} added successfully`
// }

// const successAction = async (statusCode, result,message) => {
//     console.log(message)
//     return {
//         status : statusCode,
//         result : result,
//         message: message
//     }
// }

module.exports={successResponse,notFoundResponse,unauthorizedResponse,validationErrorWithData,ErrorResponse,successResponse}