const mongoose = require('mongoose');
const moment = require("moment")


const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publicationDate: {
    type: String, 
    validate: {
      validator: function(value) {
        return moment(value, 'DD/MM/YYYY', true).isValid();
      },
      message: 'Invalid publication date or date format. Date format should be DD/MM/YYYY and should be a valid Date'
    },
    default: moment().format('DD/MM/YYYY') 
  }
});


const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
