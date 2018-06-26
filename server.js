// import required modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var Article=require('./models/model')

var app = express();
app.use(bodyParser.json());


mongoose.Promise = global.Promise;

// mongoose db connection
mongoose.connect('mongodb://localhost:27017/BlogApp').then((res)=>{console.log("success");}).catch((err)=>console.log("something went wrong. Please check connection url"));

// middleware (gets executed prior to every route request)
app.use(function middleware(req,res,next){console.log("Middleware"); next();})


//method to add new article
app.post('/addArticle', (req, res) => {
    var article = new Article({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });

    article.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


//method to list article by ID
app.get('/getArticle/:id', (req, res) => {
    var id = req.params.id;
    Article.findById(id).then((doc) => {
      if (!doc) {
        return res.status(404).send();
      }
      res.send({doc});
    }).catch((e) => {
      res.status(400).send();
    });
});


//method to list all articles
app.get('/getArticle', (req, res) => {
    
    Article.find().then((doc) => {
      if (!doc) {
        return res.status(404).send();
      }
      res.send({doc});
    }).catch((e) => {
      res.status(400).send();
    });
});


//method to delete article by ID
app.delete('/deleteArticle/:id', (req, res) => {
    var id = req.params.id;
    Article.remove({_id: id}).then((doc) => {
      if (!doc) {
        return res.status(404).send();
      }
  
      res.send({doc});
    }).catch((e) => {
      res.status(400).send();
    });
});


//method to update article by ID
app.put('/editArticle/:id', (req, res) => {
    var id = req.params.id;
    console.log(req.headers.name);
    Article.update({_id: id},{$set:{title:"updateOne"}}).then((doc) => {
      if (!doc) {
        
        return res.status(404).send();
      }
  
      res.send({doc});
    }).catch((e) => {
      res.status(400).send();
    });
});

 
//starting app
app.listen(3000, (res) => {
    console.log('Started on port 3000');
});
