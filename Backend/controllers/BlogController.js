const moment = require("moment")
const BlogPost = require("./../models/blogPost")

const createPost = async (req, res) => {
    try {
        const newPost = await BlogPost.create(req.body);
        res.json(newPost);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Title already in the Database' });
        }
        else if (error.errors.publicationDate) {
            res.status(400).json({ error: error.errors.publicationDate.message });
        } else {
            res.status(500).json({ error: 'Could not create the blog post' });
        }
    }
}
const getAll = async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve blog posts' });
    }
}

const getById = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            res.json(post);
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve the blog post' });
    }
}

const updatePost = async (req, res) => {
    try {
        const publicationDate = req.body.publicationDate;

        if (!moment(publicationDate, 'DD/MM/YYYY', true).isValid()) {
            return res.status(400).json({ error: 'Invalid publication date format. Date format should be DD/MM/YYYY and should be a valid date.' });
        }

        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!updatedPost) {
            res.status(404).json({ error: 'Blog post not found' });

        } else {
            res.json(updatedPost);
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Title already in the Database' });
        }
        else {
            res.status(500).json({ error: 'Could not update the blog post' });
        }
    }
}

const deletePost = async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndRemove(req.params.id);
        if (!deletedPost) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            res.json({ message: 'Blog post deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not delete the blog post' });
    }
}
module.exports = {
    createPost, getAll, getById, updatePost, deletePost
}