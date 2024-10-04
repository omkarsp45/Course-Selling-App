const express = require("express");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const adminRouter = require("./routes/admin");
const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => {
    console.log("listening on 3000");
});