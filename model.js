const sql = require('./db.js');

const Blog = function(blog) {
    this.heading = blog.heading;
    this.content = blog.content;
    this.author = blog.author;
    this.date = blog.date;
    this.status = 'published';
}

// add blog to db. newBlog is the blog to be added 
// result is a callback function that has 2 parameters: error and data, both changed after quering db
Blog.create = (newBlog, result) => {
    const query = 'INSERT INTO blogs SET ? ';
    sql.query(query,newBlog,(err,res)=>{
        if(err) {
            console.log(err);
            result(err,null);
            return;
        }
        result(null,{
            id:res.insertId,
            ...newBlog
        });
        console.log(typeof(result));
    });
};
Blog.getAll = result => {
    const query = 'SELECT * FROM blogs WHERE status = ?';
    sql.query(query,['published'],(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        result(null,res);
    });
}
Blog.delete = (id,result) => {
    const query = "UPDATE blogs SET status = 'rejected' WHERE id = ?";
    sql.query(query,[id],(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        result(null,res);
    });
}

Blog.getById = (id,result) => {
    const query = `SELECT * FROM blogs WHERE id = ${id}`;
    // const query = 'SELECT * FROM blogs WHERE id=3 UNION SELECT * FROM comments WHERE comments.blog_id =3';
    sql.query(query,(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        result(null,res);
    });
}

Blog.getComments = (id,result) => {
    const query = `SELECT * FROM comments WHERE blog_id = ${id}`;
    sql.query(query,(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        result(null,res);
    });
}
module.exports = Blog;