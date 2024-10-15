const express = require('express');
const courseRouter = express.Router();

courseRouter.get('/preview', (req, res)=>{
   
});

courseRouter.post('/purchase', (req, res)=>{
    res.json({
        message: "Course Purchased Successfully"
    });
});

module.exports = courseRouter;