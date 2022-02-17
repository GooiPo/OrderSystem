// CMPT353 Project A
// Jin Gu
// jig334
// 11242425

'use strict';

// load package

const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const PORT = 8080;
const HOST = '0.0.0.0';

const mysql = require('mysql');
var con = mysql.createConnection({
    host: 'mysql1',
    user: 'root',
    database: 'projecta',
    password: 'admin'
});


app.get('/connect', (req, res) => {

    con.connect(function(err) {
        if (err) console.log(err);
        console.log("Connected!");


    var sql1 = "CREATE TABLE menu (drinkID INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), price INT)";
    con.query(sql1, function (err, result) {
        if (err) throw err;
        console.log("Creating table menu successfully!");
    });

    var sql2 = "CREATE TABLE orders (orderID INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), food VARCHAR(255), time TIMESTAMP NOT NULL DEFAULT NOW(), isReady boolean default 0)";
    con.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("Creating table orders successfully!");
    });
});

    res.send("Create!");
});
    

app.get('/database', (req, res) => {
    var sql = 'SELECT * FROM menu';
    con.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        res.json(result);
    });

    var sql = 'SELECT * FROM orders';
    con.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        res.json(result);
    });
});
    
    
   // Add new item in menu 
    app.post('/Menu', (req, res) => {
        var name = req.body.name;
        var price = req.body.price;
        console.log(name);
        console.log(price);
        var sql = "INSERT INTO menu (name, price) VALUES (" + '"' + name + '"' + "," + price + ")";
    
        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log("added");
        });
        res.send("ok");
    });
    
    
    
    // get menu
    app.get('/Menu', (req, res) => {
        var sql = 'SELECT * FROM menu';
        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
    

    // delete item in menu
    app.delete('/Menu', (req, res) => {
        var id = req.query.id;
        console.log(id);
        var sql = "delete from menu where drinkID =" + id;
        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log("delete food in menu!");
        });
        res.send("ok");
    });


    app.put('/Order/OK', (req, res) => {

        var id = req.query.id;
        console.log(id);
        var sql = "update orders set isReady = 1 where orderID =" + id;

        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log("order " + id + " is ready");
        });

        res.send("ok");
    });

    // Add order 
    app.post('/Order', (req, res) => {
        var username = req.body.username;
        var food = req.body.food;
        console.log(username);
        console.log(food);
        var sql = "INSERT INTO orders (username, food) VALUES (" + '"' + username + '"' + "," + '"' + food + '"' + ")";
    
        con.query(sql, function(err, result) {
            if (err) throw err;

            res.json(result);
        });
    });
    
    // get ready order
    app.get('/Order/ready', (req, res) => {
        var sql = 'SELECT * FROM orders where isReady = 1';
        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

    // get unready order
    app.get('/Order/unready', (req, res) => {
        var sql = 'SELECT * FROM orders where isReady = 0';

        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
    
    

    app.get('/Order/ID', (req, res) => {
        var id = req.query.id;
        console.log(id);
        var sql = "select * from orders where orderID =" + id;
        con.query(sql, function(err, result) {
            if (err) console.log(err + '\n no such ID');
            console.log("read post by id");
            res.json(result);
        });
    });
    
    
    
    // delete order
    app.delete('/Order', (req, res) => {
        var id = req.query.id;
        console.log(id);
        var sql = "delete from orders where orderID =" + id;
        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log("delete post");
        });
        res.send("ok");
    });
    
    
    
    app.use('/', express.static('pages'));

    console.log('up and running');
    
    
    app.listen(PORT, HOST);