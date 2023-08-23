const express = require('express');
const bodyParser = require('body-parser');
const BlogRouter = require("./routes/blog.route")


const app = express();

app.use(bodyParser.json());

app.use("/blog",BlogRouter)



module.exports = app;
