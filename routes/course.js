const express = require('express');
const userMiddleware = require('../middlewares/userMiddleware');
const { courseModel } = require('../db');
const courseRouter = express.Router();

courseRouter.get('/preview', (req, res)=>{
    // all courses
    courseModel.find({}, (err, courses)=>{
        if(err){
            res.json({ message: "Something went wrong" });
        }
        res.json({ courses });
    })
});

courseRouter.post('/purchase', userMiddleware, async(req, res)=>{
    const userId = req.userId;
    const { courseId } = req.body;
    await userModel.updateOne({ _id: userId }, { $push: { purchasedCourses: courseId } });
    res.json({ message: "Course Purchased Successfully" });
});

module.exports = courseRouter;