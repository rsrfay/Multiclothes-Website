const express = require('express');
// const path = require('path');
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();
const mysql = require('mysql2');

var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var dbConn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log(`Connect DB: ${process.env.MYSQL_DATABASE}`)
});

app.use("/product", router1); // Register router1
app.use("/admin-login", router2); // Register router2
app.use("/admin", router3); // Register router3

app.listen(process.env.PORT, function () {
    console.log(`Server listening on port: ${process.env.PORT}`)
});

// <--- Test Cases for product management --->
// Test 1
// Testing search all
// method: get
// URL: http://localhost:3030/product/products

// Test 2
// Testing search by id
// method: get
// URL: http://localhost:3030/product/id/AB1134567890
// URL: http://localhost:3030/product/id/AB1111167890

// Testing Search by brand
// method: get
// URL:http://localhost:3030/product/brand/zara
// URL:http://localhost:3030/product/brand/fila

// Testing Search by name
// method: get
// URL: http://localhost:3030/product/name/Heart
// URL: http://localhost:3030/product/name/Oversized

// Testing Search by id and name
// method: get
// URL: http://localhost:3030/product/idname/AB1234567890/Canvas
// URL: http://localhost:3030/product/idname/456789/Fitted

// Testing Search by id and brand
// method: get
// URL: http://localhost:3030/product/idbrand/1567890/ZARA
// URL: http://localhost:3030/product/idbrand/AB111116/H&M

// Test Search by name and brand
// method: get
// URL: http://localhost:3030/product/namebrand/Double/H&M
// URL: http://localhost:3030/product/namebrand/Mens/FILA

// Test Search by id, name, and brand
// method: get
// URL: http://localhost:3030/product/all/AB1111167890/Double/H&M
// URL: http://localhost:3030/product/all/4567890/Oversized/ZARA


// Test 3
// Testing insert a new product 1
// method: post
// URL: http://localhost:3030/product/add
// body: raw JSON
// {
//     "product": {
//         "PROD_ID": "AB2224567890",
//         "PROD_NAME": "Oversized Sweatshirt",
//         "PROD_BRAND": "H&M",
//         "PROD_DES": "Oversized top in sweatshirt fabric made from a cotton blend with a soft brushed inside",
//         "PROD_TYPE": "Cloth",
//         "PROD_COLOR": "White",
//         "PROD_PRICE": "55.00",
//         "PROD_QUANTITY": 120,
//         "PROD_SIZE": "S"
//     }
// }
// Testing insert a new product 2
// {
//     "product": {
//         "PROD_ID": "AB2221234590",
//         "PROD_NAME": "pants",
//         "PROD_BRAND": "nike",
//         "PROD_DES": "lightweight, stretchy knit fabric perfect for warmer months.",
//         "PROD_TYPE": "Cloth",
//         "PROD_COLOR": "black",
//         "PROD_PRICE": "80.00",
//         "PROD_QUANTITY": 70,
//         "PROD_SIZE": "M"
//     }
// }

// Test 4
// Testing updating a product 1
// method: put
// URL: http://localhost:3030/product/update
// body: raw JSON
// {
//     "product": {
//         "PROD_ID": "AB2224567890",
//         "PROD_NAME": "Oversized Sweatshirt",
//     }
// }
// Testing updating a product 2
// {
//     "product": {
//             "PROD_ID": "AB1111167890",
//             "PROD_NAME": " Men's sport training shoes",
//             "PROD_BRAND": "FILA",
//             "PROD_QUANTITY": 120,
//             "PROD_SIZE": "41"
//         }
// }

// Test 5
// Testing deleting a product 1
// method: delete
// URL: http://localhost:3030/product/delete
// body: raw JSON
// {
//     "product": {
//          "PROD_ID": "AB2224567890"
//     }
// }
// Testing deleting a product 2
// {
//     "product": {
//          "PROD_ID": "AB2221234590"
//     }
// }

// <--- Web Service for Product information management --->
// Select All (No criteria search)
router1.get('/products', (req, res) => {
    dbConn.query("SELECT * FROM product", function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Product list.'
        });
    });
});

// Select (3 criterias search) --> id, name, brand
// Search by id
router1.get('/id/:id', (req, res) => {
    let product_id = req.params.id;
    console.log(product_id);
    if (!product_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product ID'
        });
    }
    dbConn.query(`SELECT * FROM product WHERE PROD_ID LIKE "%${product_id}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Product retrieved'
        });
    });
});

// Search by name
router1.get('/name/:name', (req, res) => {
    let product_name = req.params.name;
    console.log(product_name);
    if (!product_name) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product name'
        });
    }
    dbConn.query('SELECT * FROM product WHERE PROD_NAME LIKE "%' + product_name + '%"', function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Product retrieved'
        });
    });
});
// Search by brand
router1.get('/brand/:brand', (req, res) => {
    let product_brand = req.params.brand;
    console.log(product_brand);
    if (!product_brand) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product Brand'
        });
    }
    dbConn.query(`SELECT * FROM product WHERE PROD_BRAND LIKE "%${product_brand}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Product retrieved'
        });
    });
});

// Search by id and name
router1.get('/idname/:id/:name', (req, res) => {
    let product_id = req.params.id;
    console.log(product_id);
    let product_name = req.params.name;
    console.log(product_name);
    if (!product_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product ID'
        });
    }
    if (!product_name) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product name'
        });
    }
    dbConn.query(`SELECT * FROM product WHERE PROD_ID LIKE "%${product_id}%" OR PROD_NAME LIKE "%${product_name}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Product retrieved'
        });
    });
});

// Search by id and brand
router1.get('/idbrand/:id/:brand', (req, res) => {
    let product_id = req.params.id;
    console.log(product_id);
    let product_brand = req.params.brand;
    console.log(product_brand);
    if (!product_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product ID'
        });
    }
    if (!product_brand) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product Brand'
        });
    }
    dbConn.query(`SELECT * FROM product WHERE PROD_ID LIKE "%${product_id}%" OR PROD_NAME LIKE "%${product_brand}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Product retrieved'
        });
    });
});

// Search by name and brand
router1.get('/namebrand/:name/:brand', (req, res) => {
    let product_name = req.params.name;
    console.log(product_name);
    let product_brand = req.params.brand;
    console.log(product_brand);
    if (!product_name) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product name'
        });
    }
    if (!product_brand) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product Brand'
        });
    }
    dbConn.query(`SELECT * FROM product WHERE PROD_BRAND LIKE "%${product_brand}%" OR PROD_NAME LIKE "%${product_name}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Product retrieved'
        });
    });
});

// Search by id, name, and brand
router1.get('/all/:id/:name/:brand', (req, res) => {
    let product_id = req.params.id;
    console.log(product_id);
    let product_name = req.params.name;
    console.log(product_name);
    let product_brand = req.params.brand;
    console.log(product_brand);
    if (!product_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product ID'
        });
    }
    if (!product_name) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product name'
        });
    }
    if (!product_brand) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product Brand'
        });
    }
    dbConn.query(`SELECT * FROM product WHERE PROD_ID LIKE "%${product_id}%" OR PROD_BRAND LIKE "%${product_brand}%" OR PROD_NAME LIKE "%${product_name}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Product retrieved'
        });
    });
});

// Insert
router1.post('/add', (req, res) => {
    let product = req.body.product;
    console.log(product);
    if (!product) {
        return res.status(400).send({
            error: true,
            message: 'Please provide product information'
        });
    }
    dbConn.query("INSERT INTO product SET ?", [product], function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            message: 'New product has been created successfully'
        });
    });
});
// Update
router1.put('/update', (req, res) => {
    let product_id = req.body.product.PROD_ID;
    let product = req.body.product;
    console.log(product_id);
    console.log(product);
    if (!product || !product_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide Product information'
        });
    }
    dbConn.query("UPDATE product SET ? WHERE PROD_ID = ?", [product, product_id], function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            message: 'Product has been updated successfully'
        });
    });
});

// Delete
router1.delete('/delete', (req, res) => {
    let product_id = req.body.product.PROD_ID;
    console.log(product_id);
    if (!product_id) {
        return res.status(400).send({
            error: true,
            message: 'Please provide Product ID'
        });
    }
    dbConn.query("DELETE FROM product WHERE PROD_ID = ?", [product_id], function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            message: 'Product has been deleted successfully'
        });
    });
});

// <--- Test Cases for Admin Login authentication --->
// Test 1 = invalid
// method: post
// URL: http://localhost:3030/admin-login/
// body: raw JSON
// {
//     "username": "ress.aaa@gmail.com",
//     "password": "Somchai555"
// }

// Test 2 = valid
// method: post
// URL: http://localhost:3030/admin-login/
// body: raw JSON
// {
//     "username": "yang.non@multiclothes.com",
//     "password": "nyaungyooka"
// }

router2.post('/', (req, res) => {
    let admin_username = req.body.username;
    let admin_password = req.body.password;
    console.log('admin login:', admin_username, `at ${Date()} ${Date.now()}`);
    if (!admin_username || !admin_password) {
        return res.status(400).send({
            error: true,
            message: 'Please enter username and password'
        });
    }
    dbConn.query("SELECT AD_NUM FROM admin_login WHERE AD_USERNAME = ? AND AD_PASSWORD = ?", [admin_username, admin_password], function (error, results) {
        if (error) throw error;
        // If username or password doesn't match database
        if (results.length == 0) {
            return res.status(401).send({
                error: true,
                message: 'Invalid log in',
                status: 401
            });
        }
        else {
            return res.status(200).send({
                error: false,
                data: results,
                message: 'Successfully log in',
                status: 200
            });
        }
    });
});


// <--- Test Cases for Admin information management --->
// Test 1
// Testing search all admin
// method: get
// URL: http://localhost:3030/admin/admins

// Test 
// Testing search by num
// method: get
// URL: http://localhost:3030/admin/Id/000000001
// URL: http://localhost:3030/admin/Id/006000202

// Testing Search by fname
// method: get
// http://localhost:3030/admin/fname/somsri
// http://localhost:3030/admin/fname/Chanom

// Testing Search by lname
// method: get
// URL: http://localhost:3030/admin/lname/Naisoy
// URL: http://localhost:3030/admin/lname/Yaknon

// Testing search by ID & First Name admin
// method: get
// URL: http://localhost:3030/admin/IdFName/20/cha
// URL: http://localhost:3030/admin/IdFName/006000202/Somsri

// Testing search by ID & Last Name admin
// method: get
// URL: http://localhost:3030/admin/IdLName/32191/non
// URL: http://localhost:3030/admin/IdLName/006000202/Ma

// Testing search by First Name & Last Name admin
// method: get
// URL: http://localhost:3030/admin/FNameLName/Som/non
// URL: http://localhost:3030/admin/FNameLName/Chanom/Naisoy

// Testing search by ID & First Name & Last Name admin
// method: get
// URL: http://localhost:3030/admin/IdFNameLName/02/sood/oo
// URL: http://localhost:3030/admin/IdFNameLName/91/So/Mayang

// Test 2
// Testing insert a new admin information 1
// method: post
// URL: http://localhost:3030/admin/add
// body: raw JSON
// {
//     "admin": {
//         "AD_NUM": "000000002",
//         "AD_FNAME": "Sun",
//         "AD_LNAME": "Fayfay",
//         "AD_ADDRESS": "999 Phutthamonthon Sai 4 Rd, Salaya, Phutthamonthon District, Nakhon Pathom 73170",
//         "AD_BD": "2003-04-18",
//         "AD_EMAIL": "sun.fay@multiclothes.com",
//         "AD_PHONE": "0822356489"
//     }
// }
// Testing insert a new admin information 2
// {
//     "admin": {
//         "AD_NUM": "000000009",
//         "AD_FNAME": "God",
//         "AD_LNAME": "Fairly",
//         "AD_ADDRESS": "999 Phutthamonthon Sai 4 Rd, Salaya, Phutthamonthon District, Nakhon Pathom 73170",
//         "AD_BD": "2002-02-22",
//         "AD_EMAIL": "god.fairly@multiclothes.com",
//         "AD_PHONE": "0811121212"
//     }
// }

// Test 3
// Testing updating an admin information 1
// method: put
// URL: http://localhost:3030/admin/update
// body: raw JSON
// {
//     "admin": {
//         "AD_NUM": "000000002",
//         "AD_FNAME": "Sun",
//         "AD_LNAME": "Fayfayfayfayfayfay",
//         "AD_ADDRESS": "999 Phutthamonthon Sai 4 Rd, Salaya, Phutthamonthon District, Nakhon Pathom 73170",
//         "AD_BD": "2003-04-18",
//         "AD_EMAIL": "sun.fay@multiclothes.com",
//         "AD_PHONE": "0822356489"
//     }
// }
// Testing updating an admin information 2
// {
//     "admin": {
//        "AD_NUM": "000000009",
//         "AD_FNAME": "God",
//         "AD_LNAME": "Fairytale",
//         "AD_EMAIL": "god.fairy@multiclothes.com",
//         "AD_PHONE": "0812121212"
//     }
// }

// Test 4
// Testing deleting an admin information 1
// method: delete
// URL: http://localhost:3030/admin/delete
// body: raw JSON
// {
//     "admin": {
//         "AD_NUM": "000000002"
//     }
// }
// Testing deleting an admin information 2
// {
//     "admin": {
//         "AD_NUM": "000000009"
//     }
// }

// <--- Web Service for Admin information management --->
// Select All (No criteria search)
router3.get('/admins', (req, res) => {
    dbConn.query("SELECT * FROM admin_info", function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Administrator list.'
        });
    });
});

// Select (3 criterias search for admin management) --> fname, lname, num
// Search by num
router3.get('/Id/:num', (req, res) => {
    let ad_num = req.params.num;
    console.log(ad_num);
    if (!ad_num) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin number'
        });
    }
    dbConn.query(`SELECT * FROM admin_info WHERE AD_NUM LIKE "%${ad_num}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Admin information retrieved'
        });
    });
});

// Search by fname
router3.get('/FName/:fname', (req, res) => {
    let admin_fname = req.params.fname;
    console.log(admin_fname);
    if (!admin_fname) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin first name'
        });
    }
    dbConn.query(`SELECT * FROM admin_info WHERE AD_FNAME LIKE "%${admin_fname}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Admin information retrieved'
        });
    });
});

// Search by lname
router3.get('/LName/:lname', (req, res) => {
    let admin_lname = req.params.lname;
    console.log(admin_lname);
    if (!admin_lname) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin last name'
        });
    }
    dbConn.query(`SELECT * FROM admin_info WHERE AD_LNAME LIKE "%${admin_lname}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Admin information retrieved'
        });
    });
});

// Search by num and fname
router3.get('/IdFName/:num/:fname', (req, res) => {
    let ad_num = req.params.num;
    console.log(ad_num);
    let ad_fname = req.params.fname;
    console.log(ad_fname);
    if (!ad_num) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin number'
        });
    }
    if (!ad_fname) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin first name'
        });
    }
    dbConn.query(`SELECT * FROM admin_info WHERE AD_NUM LIKE "%${ad_num}%" OR AD_FNAME LIKE "%${ad_fname}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Admin information retrieved'
        });
    });
});

// Search by num and lname
router3.get('/IdLName/:num/:lname', (req, res) => {
    let ad_num = req.params.num;
    console.log(ad_num);
    let ad_lname = req.params.lname;
    console.log(ad_lname);
    if (!ad_num) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin number'
        });
    }
    if (!ad_lname) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin last name'
        });
    }
    dbConn.query(`SELECT * FROM admin_info WHERE AD_NUM LIKE "%${ad_num}%" OR AD_LNAME LIKE "%${ad_lname}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Admin information retrieved'
        });
    });
});

// Search by fname and lname
router3.get('/FNameLName/:fname/:lname', (req, res) => {
    let ad_fname = req.params.fname;
    console.log(ad_fname);
    let ad_lname = req.params.lname;
    console.log(ad_lname);
    if (!ad_fname) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin first name'
        });
    }
    if (!ad_lname) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin last name'
        });
    }
    dbConn.query(`SELECT * FROM admin_info WHERE AD_FNAME LIKE "%${ad_fname}%" OR AD_LNAME LIKE "%${ad_lname}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Admin information retrieved'
        });
    });
});

// Search by num, fname, and lname
router3.get('/IdFNameLName/:num/:fname/:lname', (req, res) => {
    let ad_num = req.params.num;
    console.log(ad_num);
    let ad_fname = req.params.fname;
    console.log(ad_fname);
    let ad_lname = req.params.lname;
    console.log(ad_lname);
    if (!ad_num) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin number'
        });
    }
    if (!ad_fname) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin first name'
        });
    }
    if (!ad_lname) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin last name'
        });
    }
    dbConn.query(`SELECT * FROM admin_info WHERE AD_NUM LIKE "%${ad_num}%" OR AD_FNAME LIKE "%${ad_fname}%" OR AD_LNAME LIKE "%${ad_lname}%"`, function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Admin information retrieved'
        });
    });
});

// Insert
router3.post('/add', (req, res) => {
    let adminInfo = req.body.Admin_info;
    let adminLogin = req.body.Admin_login;
    if (!adminInfo || !adminLogin) {
        return res.status(400).send({
            error: true,
            message: 'Please provide new admin information'
        });
    }
    dbConn.query("INSERT INTO admin_info SET ?", [adminInfo], function (error, results) {
        if (error) throw error;
    });
    dbConn.query("INSERT INTO admin_login SET ?", [adminLogin], function (error, results) {
        if (error) throw error;
    });
    return res.send({
        error: false,
        message: 'New administrator information has been created successfully'
    });
});

// Update
router3.put('/update', (req, res) => {
    let admin_num = req.body.Admin_info.AD_NUM;
    let admin = req.body.Admin_info;
    console.log(admin_num);
    console.log(admin);
    if (!admin || !admin_num) {
        return res.status(400).send({
            error: true,
            message: 'Please provide admin information'
        });
    }
    dbConn.query("UPDATE admin_info SET ? WHERE AD_NUM = ?", [admin, admin_num], function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results.affectedRows,
            message: 'Administrator information has been updated successfully'
        });
    });
});

// Delete
router3.delete('/delete', (req, res) => {
    let admin_num = req.body.Admin.AD_NUM;
    console.log(admin_num);
    if (!admin_num) {
        return res.status(400).send({
            error: true,
            message: 'Please provide Admin number'
        });
    }
    dbConn.query("DELETE FROM admin_login WHERE AD_NUM = ?", [admin_num], function (error, results) {
        if (error) throw error;
    });
    dbConn.query("DELETE FROM admin_info WHERE AD_NUM = ?", [admin_num], function (error, results) {
        if (error) throw error;
    });
    return res.send({
        error: false,
        message: 'Administrator information has been deleted successfully'
    });
});