const user = require('../../models/userModel/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.findUser = async (userInfo) => {
    const roles = ['student','parent', 'tutor', ];
    if(userInfo.role==='1'){
        userInfo.role = roles[0];
    } 
    else if(userInfo==='2'){
        userInfo.role=roles[1];
    }
    else if(userInfo.role==='3'){
        userInfo.role=roles[2];
    }
    const userExist = await user.findOne(
        {userEmail: userInfo.userEmail});
    return userExist;
}

exports.findAllUser = async() => {
    const userList = await user.find();
    return userList;
}

exports.createUser = async (userInfo) => {
    try {
        // const roles = ['student', 'tutor', 'parent'];
        if(userInfo.role==='1'){
            userInfo.role = "student";
        } 
        else if(userInfo.role==='2'){
            userInfo.role="parent";
        }
        else if(userInfo.role==='3'){
            userInfo.role='tutor';
        }
        console.log("role: ", userInfo.role);
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(userInfo.password, salt);
        const newUser = new user({ userName: userInfo.userName, userEmail: userInfo.userEmail, password: hashedPassword, role:userInfo.role });
        await newUser.save();
        return newUser;
    } catch (error) {
        console.log("Error at createUser: ", error);
    }
}

exports.verifyUser = async (userInfo, userExist) => {
    const verifyPassword = await bcrypt.compare(userInfo.password, userExist.password);
    if(verifyPassword){
        const token = jwt.sign({ userEmail: userInfo.userEmail, role: userExist.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
        return token;
    } return verifyPassword;
}

exports.editUser = async(userInfo) => {
    const userUpdate = await user.findOne({ userName: userName })
    userUpdate.userName = req.body.userName
    userUpdate.userEmail = req.body.userEmail
    userUpdate.password = req.body.password
    userUpdate.save();
}