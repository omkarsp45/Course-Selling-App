const express = require('express');
const userRouter = express.Router();

userRouter.post('/sign-up', (req, res)=>{
    res.json({
        message: "Successfully Signed Up"
    })
});

userRouter.post('/login', (req, res)=>{
    res.json({
        message: "Successfully Logged In"
    })
})

userRouter.get('/my-courses', userMiddleware, (req, res)=>{
    res.json({
        message: "This are your courses"
    });
});

module.exports = userRouter;