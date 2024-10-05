const express = require('express');
const adminRouter = express.Router();
const adminMiddleware = require('../middlewares/adminMiddleware');
const zod = require('zod');
const { adminModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');

const schema = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(8).max(20),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3)
});

adminRouter.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = schema.parse(req.body);
        await adminModel.create({ email, password, firstName, lastName });
        res.json({
            message: "Signed Up Successfully"
        });
    } catch {
        res.status(400).json({
            message: "Credentials are not valid"
        });
    }
});

adminRouter.post('/login', (req, res) => {
    res.json({
        message: "Logged In Successfully"
    });
});

adminRouter.post('/course', (req, res) => {
    res.json({
        message: "Course Created Successfully"
    });
});

adminRouter.get('/my-course', (req, res) => {
    res.json({
        message: "This are your courses"
    });
});

module.exports = adminRouter;