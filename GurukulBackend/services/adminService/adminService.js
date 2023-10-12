const admin = require('../../models/AdminModel/Admin');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.createdAdmin = async (adminInfo) => {
    const adminExist = await admin.findOne({ email: adminInfo.email });
    if (adminExist) {
        return
    }
    else {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(adminInfo.password, salt);
        let newAdmin = new admin({ email: adminInfo.email, password: hashedPassword });
        await newAdmin.save();
        return newAdmin;
    }
}

exports.findAdmin = async (adminInfo) => {
    const adminExist = await admin.findOne({ email: adminInfo.email });
    if (!adminExist) {
        return;
    }
    else {
        const verifyPassword = await bcrypt.compare(adminInfo.password, adminExist.password);
        if (verifyPassword) {
            const token = jwt.sign({ email: adminInfo.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
            return token;
        } return verifyPassword;
    }
}