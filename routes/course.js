const express = require('express');
const userMiddleware = require('../middlewares/userMiddleware');
const { courseModel, purchaseModel } = require('../db');
const courseRouter = express.Router();

courseRouter.get('/preview', async (req, res) => {
    const courses = await courseModel.find({});
    res.json({ courses });
});

courseRouter.post('/purchase', userMiddleware, async (req, res) => {
    const userId = req.userId;
    const { courseId } = req.body;
    const existingPurchase = await purchaseModel.findOne({ userId, courseId });
    if (existingPurchase) {
        return res.status(400).json({
            message: "Already Purchased"
        });
    }
    await purchaseModel.create({ userId, courseId });
    res.json({ message: "Course Purchased Successfully" });
});

module.exports = courseRouter;