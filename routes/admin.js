const express = require('express');
const adminRouter = express.Router();

adminRouter.post('/signup', (req, res)=>{
    res.json({
        message: "Signed Up Successfully"
    });
});

adminRouter.post('/login', (req, res)=>{
    res.json({
        message: "Logged In Successfully"
    });
});

adminRouter.post('/course', adminMiddleware, (req, res)=>{
    res.json({
        message: "Course Created Successfully"
    });
});

adminRouter.get('/my-course', adminMiddleware, (req, res)=>{
    res.json({
        message: "This are your courses"
    });
});

module.exports = adminRouter;