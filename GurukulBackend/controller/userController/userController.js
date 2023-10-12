const { createUser, verifyUser, findUser, editUser, findAllUser } = require('../../services/userService/userService');
const { successResponse, ErrorResponse, unauthorizedResponse } = require('../../helper/apiResponse');


exports.userSignup = async (req, res) => {
    try {
        console.log("reqq",req.body)
        const { userName, userEmail, password, role } = req.body;
        const userInfo = { userName, userEmail, password, role };
        console.log("req.body", userInfo);
        const userExist = await findUser(userInfo);
        if (userExist) {
            return unauthorizedResponse(res, 403, "Invalid credentials");
        }
        else {
            const $user = await createUser(userInfo);
            if ($user) {
                return successResponse(res, 201, "user has been created", $user)
            }
            else {
                return unauthorizedResponse(res, 403, "Invalid credentials");
            }
        }
    } catch (error) {
        console.log("Errror at userSignup: ", error);
        return ErrorResponse(res, error.message)
    }
}

exports.userSignedIn = async (req, res) => {
    try {
        let $user = null;
        const { userEmail, password} = req.body;
        const userInfo = { userEmail, password };
        const userExist = await findUser(userInfo);
        console.log("userExist: ", userExist);
        if (userExist) {
            $user = await verifyUser(userInfo, userExist);
            console.log("$user: ", $user)
            if ($user) {
                return successResponse(res, 200, "login successfull", $user, userExist.role);
            } else {
                return unauthorizedResponse(res, 403, "Invalid credentials")
            }
        }
        else {
            return unauthorizedResponse(res, 403, "Invalid credentials")
        }
    } catch (error) {
        console.log("Error at signedInUser: ", error);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { userName } = req.body;
        const userInfo = { userName };
        const $editUser = await editUser(userInfo);
        if($editUser){
            return successResponse(res, 201, "userName has been edited: ", $editUser);
        } return unauthorizedResponse(res, 403, "Invalid credentials");
    } catch (error) {
        console.log("Error at updateUser: ", error);
    }
}
exports.getUser = async(req, res) => {
    try {
        const userList = await findAllUser();
        if(userList){
            return successResponse(res, 201, "Here is userList: ", userList);
        } return unauthorizedResponse(res, 403, "No user available");
    } catch (error) {
        console.log("Error at getUser: ", error);
    }
}