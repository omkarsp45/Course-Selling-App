const express = require('express');
const adminRouter = express.Router();
const adminMiddleware = require('../middlewares/adminMiddleware');
const schema = require('../zod.js');
const bcrypt = require('bcrypt');
const saltrounds = 10;
const { adminModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');

adminRouter.post('/sign-up', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = schema.parse(req.body);
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
        const { email, password } = schema.parse(req.body);
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
        localStorage.setItem('adminToken', token);
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

adminRouter.post('/course', (req, res) => {
    res.json({
        message: "Course Created Successfully"
    });
});

adminRouter.get('/my-courses', (req, res) => {
    res.json({
        message: "This are your courses"
    });
});

module.exports = adminRouter;