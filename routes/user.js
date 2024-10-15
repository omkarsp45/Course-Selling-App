const express = require('express');
const userRouter = express.Router();
const userMiddleware = require('../middlewares/userMiddleware.js');
const bcrypt = require('bcrypt');
const saltrounds = 10;
const jwt = require('jsonwebtoken');
const { signUpSchema, loginSchema } = require('../zod.js');
const { userModel } = require('../db');

userRouter.post('/sign-up', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = signUpSchema.parse(req.body);
        const salt = await bcrypt.genSalt(saltrounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await userModel.create({ email, password: hashedPassword, firstName, lastName });
        res.json({
            message: "Signed Up Successfully"
        });
    } catch {
        res.status(400).json({
            message: "Credentials are not valid"
        });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = await userModel.findOne({ email });
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
        const token = jwt.sign({ userId: user._id }, process.env.JWT_USER_PASSWORD, { expiresIn: '1d' });
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

userRouter.get('/my-courses', userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courses = await userModel.findOne({ _id: userId}).populate('purchasedCourses');
    res.json({
        message: "My Courses",
        courses
    });
});

module.exports = userRouter;