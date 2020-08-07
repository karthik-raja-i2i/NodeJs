const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')
const db = require('./models')
const Role = db.role
const Category = db.category
const Statuses = db.status

// create express server
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
}

//middleware to parse req body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors(corsOptions));

// the db tables are created and altered when columns are changed
// when sync({alter:true}) is set
db.sequelize.sync({force:true}).then(() => {
    console.log('created');
    initialize();
    createCategories();
})

// function to create roles for first time. when calling it,
// set sync({force:true})
function initialize() {
    Role.create({
        name: db.ROLES[0]
    });
    Role.create({
        name: db.ROLES[1]
    });
    Role.create({
        name: db.ROLES[2]
    });
    Role.create({
        name: db.ROLES[3]
    });
    Role.create({
        name: db.ROLES[4]
    });
    Role.create({
        name: db.ROLES[5]
    });
    
}

function createCategories() {
    Category.create({
        name: 'Fiction',
        status: 'active'
    });
    Category.create({
        name: 'Crime',
        status: 'active'
    });
    Category.create({
        name: 'Sci-fi',
        status: 'active'
    });
    Category.create({
        name: 'Drama',
        status: 'active'
    });
    Category.create({
        name: 'Adventure',
        status: 'active'
    });

    Statuses.create({
        status: 'approved'
    });
    Statuses.create({
        status: 'pending'
    });
    Statuses.create({
        status: 'rejected'
    });
}

app.get("/", (req, res) => {
    res.json({ message: "Application running" });
  })

// configuring routes to the server
// the server instance is set as the parameter
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

//starting the server at 3000 port
app.listen(3000,()=> {
    console.log('running');
});