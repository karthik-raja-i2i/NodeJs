const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')
const db = require('./models')
const Role = db.role

// create express server
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
}

//middleware to parse req body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors(corsOptions));

// db.sequelize.sync({force:false}).then(() => {
//     console.log('created');
//     initialize();
// })

// function initialize() {
//     Role.create({
//         id:1,
//         name: db.ROLES[0]
//     });
//     Role.create({
//         id:2,
//         name: db.ROLES[1]
//     });
//     Role.create({
//         id:3,
//         name: db.ROLES[2]
//     });
//     Role.create({
//         id:4,
//         name: db.ROLES[3]
//     });
    
// }

app.get("/", (req, res) => {
    res.json({ message: "Application running" });
  })

//configuring routes to the server
// the server instance is set as the parameter
//require('./routes')(app);
require('./routes/auth.routes')(app);

//starting the server at 3000 port
app.listen(3000,()=> {
    console.log('running');
});