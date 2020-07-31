// the app paramenter is express server instance
module.exports = (app) => {

    // handeler methods for each requests
    const blogs = require('./controller.js');
    
    app.get('/blogs',blogs.getAllBlogs);
    app.post('/blog',blogs.addBlog);
    app.put('/blog',blogs.delete);
    app.get('/blog',blogs.getById);
}