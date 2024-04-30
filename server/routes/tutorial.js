const express = require('express');
const router = express.Router();

const {Op} = require("sequelize");

const {Tutorial} = require('../models'); //new line

//let tutorialList = [];

//router.post("/", (req, res) => {
    //let data = req.body;
    //tutorialList.push(data);
    //res.json(data);
//});

router.post("/", async(req, res) => {
    let data = req.body;
    let result = await Tutorial.create(data);
    res.json(result);
});

router.get("/", async (req, res) => { 
    let condition = {}; 
    let search = req.query.search; 
    if (search) { 
        condition[Op.or] = [ 
            { title: { [Op.like]: `%${search}%` } }, 
            { description: { [Op.like]: `%${search}%` } } 
        ]; 
    } 
    // You can add condition for other columns here 
    // e.g. condition.columnName = value;

    let list = await Tutorial.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    })
    res.json(list);
});

module.exports = router;