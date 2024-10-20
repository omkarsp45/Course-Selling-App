const express = require('express');
const adminRouter = express.Router();
const adminMiddleware = require('../middlewares/adminMiddleware');
const { signUpSchema, loginSchema } = require('../zod.js');
const bcrypt = require('bcrypt');
const saltrounds = 10;
const { adminModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');

adminRouter.post('/sign-up', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = signUpSchema.parse(req.body);
        const existingUser = await adminModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email Already Exists"
            });
        }
        const salt = await bcrypt.genSalt(saltrounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await adminModel.create({ email, password: hashedPassword, firstName, lastName });
        res.json({
            message: "Signed Up Successfully"
        });
    } catch {
        res.status(400).json({
            message: "Credentials are not valid"
        });
    }
});

adminRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = await adminModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email Not Found"
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                message: "Incorrect Password"
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_ADMIN_PASSWORD, { expiresIn: '1d' });
        res.json({
            message: "Logged In Successfully",
            token
        });
    } catch {
        res.status(400).json({
            message: "Credentials are not valid"
        });
    }
});

adminRouter.post('/course', adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const { title, description, price, imageUrl } = req.body;
    await courseModel.create({
        name : title,
        description,
        price,
        imageUrl,
        creatorId: adminId
    });
    res.json({ message: "Course Created Successfully" });
});

adminRouter.put('/course', adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const { title, description, price, imageUrl } = req.body;
    await courseModel.updateOne({ creatorId: adminId , name: title}, {
        name : title,
        description,
        price,
        imageUrl,
        creatorId: adminId
    });
    res.json({ message: "Course Updated Successfully" });
});

adminRouter.get('/my-courses', adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const courses = await courseModel.find({ _id: adminId });
    res.json({ courses });
});

module.exports = adminRouter;