const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
firstName: {type:String, required:true},
lastName:  {type:String, required:true},
age:  {type:Number, required:true},
country:  {type:String, required:true},
email:  {type:String, required:true, unique:true},
password: {type:String, required:true, unique:true}
})

const articlesSchema  = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    description : {type:String, required:true},
    author:{type:mongoose.Schema.ObjectId,ref:"users"}
})


const users = mongoose.model("users", usersSchema);
const articles = mongoose.model("articles", articlesSchema);
module.exports.users = users;
module.exports.articles = articles;