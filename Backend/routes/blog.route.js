const express = require("express");
const BlogController = require("./../controllers/BlogController")
const BlogMiddleWare = require("./../middlewares/BlogMiddleware")
const router = express.Router();

const validateBodyRequest = BlogMiddleWare.validateRequestBody(BlogMiddleWare.createPostSchema)

const validateParam = BlogMiddleWare.validateIdParam


//Get all the BlogPost
router.get("/",BlogController.getAll)

//Create a new BlogPost 
router.post("/",validateBodyRequest, BlogController.createPost)

//Get a BlogPost by id
router.get("/:id",validateParam,BlogController.getById)

//Update a BlogPost by ig
router.put("/:id",validateParam,BlogController.updatePost)

//Delete a Blogpost by id
router.delete("/:id",validateParam,BlogController.deletePost)

module.exports = router;