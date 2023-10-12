const { unauthorizedResponse, successResponse, ErrorResponse } = require('../../helper/apiResponse');
const { findAdmin, createdAdmin } = require('../../services/adminService/adminService');

exports.createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminInfo = { email, password };
        const adminExist = await createdAdmin(adminInfo);
        if (adminExist) {
            return successResponse(res, 201, "admin created");
        }
        else {
            return unauthorizedResponse(res, 404, "Invalid request");
        }
    } catch (error) {
        console.log("Error at createAdmin", error);
        return ErrorResponse(res, error.message)
    }
}

exports.adminSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminInfo = { email, password };
        const adminExist = await findAdmin(adminInfo);
        if (!adminExist) {
            return unauthorizedResponse(res, 403, "Invalid credentials")
        }
        else {
            return successResponse(res, 200, "login successfull", adminExist);
        }
    } catch (error) {
        console.log("Error at adminSignIn: ", error);
    }
}