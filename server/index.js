const express = require('express');
const cors = require('cors');

const db = require('./models'); //new line


require('dotenv').config();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL
}));

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});

// Routes
const tutorialRoute = require('./routes/tutorial');
app.use("/tutorial", tutorialRoute);

db.sequelize.sync({ alter: true }) 
    .then(() => { 
        let port = process.env.APP_PORT; 
        app.listen(port, () => { 
            console.log(`Sever running on http://localhost:${port}`); 
        }); 
    }) 
    .catch((err) => { 
        console.log(err); 
    });