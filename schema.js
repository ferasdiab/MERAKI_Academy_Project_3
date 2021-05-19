const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { response } = require("express");

const usersSchema = new mongoose.Schema({
firstName: {type:String, required:true},
lastName:  {type:String, required:true},
age:  {type:Number, required:true},
country:  {type:String, required:true},
email:  {type:String, required:true, unique:true},
password: {type:String, required:true, unique:true},
roles : {type:mongoose.Schema.ObjectId,ref:"roles"}
})
//////////
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

const rolesSchema = new mongoose.Schema({
    role : {type:String},
    permissions : [{type:String}]
})


const users = mongoose.model("users", usersSchema);
const articles = mongoose.model("articles", articlesSchema);
const comments = mongoose.model("comments", commentsSchema);
const roles = mongoose.model("roles", rolesSchema);

///
module.exports.users = users;
module.exports.articles = articles;
module.exports.comments = comments;
module.exports.roles = roles;

