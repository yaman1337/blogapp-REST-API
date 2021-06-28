const router = require('express').Router();
const Blog = require('../models/Blogs');
const login = require('../middlewares/requireLogin');



// fetch all posts
router.get('/all', async(req, res) => {
    try {
        const allBlogs = await Blog.find();
        if (allBlogs.length == 0) return res.status(200).json({ message: "No blogs yet." });
        res.status(200).json({
            status: "success",
            data: allBlogs
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// add a new blog
router.post('/add', (req, res) => {
    try {
        const { title, body } = req.body;
        const author = "admin";
        const date = new Date();
        const newBlog = new Blog({ author, title, body, date });
        newBlog.save()
            .then(() => {
                res.status(201).json({ message: "Successfully added a blog" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "Some error occured." })
            })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// delete blog
router.delete('/delete/:_id', async(req, res) => {
    try {
        const { _id } = req.params;
        const blog = await Blog.findById({ _id });
        blog.delete()
            .then(() => {
                res.status(200).json({ message: "Deleted" });
            })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// search blogs
router.get('/search', async(req, res) => {
    try {
        const { query } = req.query;
        if (!query || query == "") {
            return res.status(404).json({ message: "No data found" });
        }
        const queryArray = query.split(" ");
        allQueries = [];
        queryArray.forEach(data => {
            allQueries.push({ title: { $regex: String(data) } });
        });
        const allBlogs = await Blog.find({ $or: allQueries });
        if (!allBlogs || allBlogs.length == 0) return res.status(404).json({ message: "No blogs found" });

        res.status(200).json({ data: allBlogs, status: "success" });

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;