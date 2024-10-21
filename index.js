require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const adminRouter = require("./routes/admin");
const app = express();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "You have sent too many requests. Please try again later.",
            status: 429
        });
    }
});
app.use(limiter);
app.use(express.json());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}
main();