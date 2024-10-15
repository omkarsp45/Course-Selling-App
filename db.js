const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const courseSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const userModel = mongoose.model('User', userSchema, 'User');
const adminModel = mongoose.model('Admin', adminSchema, 'Admin');
const courseModel = mongoose.model('Course', courseSchema, 'Course');
const purchaseModel = mongoose.model('Purchase', purchaseSchema, 'Purchase');

module.exports = {userModel, adminModel, courseModel, purchaseModel};