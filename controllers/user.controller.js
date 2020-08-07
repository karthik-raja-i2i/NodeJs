const db = require('../models');
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const url = require('url');
const Blog = db.blog;
const Comment = db.comment;
const User = db.user;
const Reply = db.reply;
const Category = db. category;
const Tag = db.tag;
const Status = db.status;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.superAdminArea = (req, res) => {
    res.status(200).send("Super Admin Content.");
};

exports.adminArea = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorArea = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.authorArea = (req, res) => {
  const q = url.parse(req.url);
  if(q.pathname == '/blog/add') {
    let tags = [];
    console.log('TAGSSS',req.body.tags)
    req.body.tags.forEach(tag => {
      const tagName = {
        name: tag
      }
      tags.push(tagName);
    });
    console.log(tags)
    Blog.create({
      title: req.body.title,
      content: req.body.content,
    }).then(blog => {
      User.findOne({
        where: {
          username:req.body.author
        }
      }).then(user => {
        blog.setUser(user).then(blog => {
          // res.status(200).send({
          //   message:'blog added'
          // })
          console.log(user)
        })
      })
      Category.findByPk(req.body.categoryId)
          .then(category => {
          blog.setCategories(category).then(blog => {
            // res.status(200).send({
            // message:'blog added',
            // blog: blog
          // })
          console.log(blog)
        })
      })
      Status.findByPk(1)
        .then(status => {
          console.log(status)
          blog.setStatus(status).then(blog => {
            console.log(blog)
          })
        })
      Tag.bulkCreate(tags,{ignoreDuplicates:true}
      ).then(tag => {
            blog.setTags(tag)
            .then(blog => {
            res.status(200).send({
            message:'blog added',
            blog: blog
          })
        })
      })
    }).catch(err => {
      res.status(500).send({
          message:err.message
      })
    })
  }
  if(q.pathname == '/blog') {
  
  }
};

exports.postComment = (req,res) => {
  const q = url.parse(req.url);
  Comment.create({
    content: req.body.comment,
    author : req.body.author
  }).then(comment => {
    Blog.findByPk(req.body.blogId).then(blog => {
      comment.setBlog(blog).then(blog => {
        res.status(200).send({
          message: 'comment sent for approval'
        })
      })
    })
  }).catch(err => {
    res.status(500).send({
        message:err.message
    })
  })
}

exports.postReply = (req,res) => {
  const q = url.parse(req.url);
  Reply.create({
    content: req.body.reply,
    author : req.body.author
  }).then(reply => {
    Comment.findByPk(req.body.commentId).then(comment => {
      reply.setComment(comment).then(reply => {
        res.status(200).send({
          message: 'reply sent'
        })
      })
    })
  }).catch(err => {
    res.status(500).send({
        message:err.message
    })
  })
}

exports.getBlog = (req,res) => {
  const id = req.params.id;
  Blog.findOne({
    where: {
      id:id
    },
    include : [{
      model: Comment,
      include : {
        model: Reply
      }
    },{
      model:Category,
      attributes: ['name','id']
    },{
      model:Tag,
      attributes: ['name','id']

    }]
  }).then(blog => {
    res.status(200).send({
      message: 'blog found',
      blog: blog
    })
  })
}

exports.getBlogforModerator = (req,res) => {
  const id = req.params.id;
  Blog.findOne({
    where: {
      id:id
    },
    include: {
      model: Comment,
      where: {
        status:'pending'
      },
      required: false
    }
  }).then(blog => {
    res.status(200).send({
      message: 'blog found for moderator',
      blog: blog
    })
  })
}

exports.getReplies = (req,res) => {
  const id = req.params.id;
  Reply.findAll({
    where:{
      commentId: id
    }
  }).then(replies => {
    res.status(200).send({
      message: 'replies found',
      replies: replies
    })
  })
}

exports.addCategory = (req,res) => {
  Category.create({
    name: req.body.name,
    status: 'active'
  }).then(category => {
    res.status(200).send({
      message: 'category added'
    })
  })
}

exports.getBlogByCategory = (req,res) => {
  const id = req.params.id;
}

exports.getAllBlogs = (req,res) => {
  Blog.findAll({
    where: {
      status: 'pending'
    }
  }).then(blogs => {
    res.status(200).send({
      message: 'blogs found',
      blogs
    })

  })
}