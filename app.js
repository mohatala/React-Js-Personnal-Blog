//jshint esversion:6

const express=require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');
const lodash = require('lodash');
const mongoose = require('mongoose');
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/Blog",{useNewUrlParser:true});

const postSchema=new mongoose.Schema({
    title:String,
    content:String
});
const Post=mongoose.model("Post",postSchema);



app.get('/',function (req,res) {
  Post.find({},function(err,posts) {
    res.render('home',{'homecontent':posts});
  });
});

app.get('/about',function (req,res) {
  res.render('about',{'aboutContent':aboutContent});
});
app.get('/contact',function (req,res) {
  res.render('contact',{'contactContent':contactContent});
});

app.get('/compose',function (req,res) {
  res.render('compose');
});
app.post('/compose',function (req,res) {
  const title=req.body.posttitle;
  const content=req.body.postbody;
  const p= new Post({title:lodash.lowerCase(title),content:content});
  p.save();
  res.redirect("/");
});

app.get('/posts/:postid',function (req,res) {
  const idpost=req.params.postid;
  Post.findOne({_id:idpost},function(err,foundList) {
    //console.log(foundList);
    res.render('post',{'postcontent':foundList});
  });

});

app.listen(3000, 'localhost', () => {
  console.log(`Server running `);
});
