const Blog = require('./model.js');
const url = require('url');

// handler method to add blog. constructs a blog object from request body and 
exports.addBlog = (req,res) => {
    console.log(req.body);
    if(!req.body) {
        res.status(400).send({
            message: 'empty blog!'
        });
    }
    const blog = new Blog({
        heading : req.body.data.heading,
        content : req.body.data.content,
        author : req.body.data.author,
        date : req.body.data.date,
        status : 'published' 
    });
// the second parameter here is a function with two params on its own; err and data
// these two parameters gets populated after db query is done. The updated values are
// used to send back the response. Both the parameters here are passed as reference. So the changes
// made to the arguments will be reflected here 
    Blog.create(blog,(err,data) => {
        if(err) {
            res.status(500).send({
                message: err.message || 'sql error'
            });
        }else {
            res.send(data);
        }
    })
};

exports.getAllBlogs = (req,res) => {
    Blog.getAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || 'sql error'
            });
        } else {
            res.send(data);
        }
    });
}

exports.delete = (req,res) => {
    if(!req.body) {
        res.status(400).send({
            message: 'no blog id!'
        });
    }
    Blog.delete(req.body.data.id,(err,data) => {
        if(err) {
            res.status(500).send({
                message: err.message || 'sql error'
            });
        }else {
            res.send(data);
        }
    })
}
exports.getById = (req,res) => {
    const query = url.parse(req.url,true);
    const id = query.query.id;
    if(id == null) {
        res.status(400).send({
            message: 'no blog id'
        });
    } 
    Blog.getById(id,(err,data) => {
        if(err) {
            res.send(500).send({
                message: err.message || 'sql error'
            });
        } else {
            res.send(data)
        }
    })
}
