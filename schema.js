const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { response } = require("express");

const usersSchema = new mongoose.Schema({
firstName: {type:String, required:true},
lastName:  {type:String, required:true},
age:  {type:Number, required:true},
country:  {type:String, required:true},
email:  {type:String, required:true, unique:true},
password: {type:String, required:true, unique:true}
})
const salt = 10 
usersSchema.pre("save", async function () {
    this.email = this.email.toLowerCase();
    const hashedPassword =  await bcrypt.hash(this.password, salt);
    this.password = hashedPassword
  });

const articlesSchema  = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    description : {type:String, required:true},
    author:{type:mongoose.Schema.ObjectId,ref:"users"},
    comments : [{type:mongoose.Schema.ObjectId,ref:"comments"}]
})

const commentsSchema = new mongoose.Schema({
    comment : {type:String, required:true},
    commenter : {type:mongoose.Schema.ObjectId,ref:"users"}
})


const users = mongoose.model("users", usersSchema);
const articles = mongoose.model("articles", articlesSchema);
const comments = mongoose.model("comments", commentsSchema);
///
module.exports.users = users;
module.exports.articles = articles;
module.exports.comments = comments;
