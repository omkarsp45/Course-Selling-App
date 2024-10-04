const express = require('express');
const courseRouter = express.Router();

courseRouter.get('/preview', (req, res)=>{
   res.json({
    message: "All Courses"
   });
});

courseRouter.post('/purchase', userMiddleware, (req, res)=>{
    res.json({
        message: "Course Purchased Successfully"
    });
});

module.exports = courseRouter;