//import required modules
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

// create a schema
var ArticleSchema = new Schema({
  
  title: { type: String, required: true },
  author: { type: String, required: true},
  content: { type: String, required: true},
});

//create a model using it
var Article = mongoose.model('Article', ArticleSchema);

// make this available to our users in our Node applications
module.exports = Article;