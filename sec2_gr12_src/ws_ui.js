const express = require('express');
const bodyParser = require('body-parser');
const { redirect } = require('express/lib/response');
const path = require('path');
const port = 3031;
const app = express();
var cors = require('cors');
const api = require('./html/client3');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
app.use(router);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Static folder 'html'
app.use('/', express.static(path.join(__dirname, 'html')));

//  Home Page
router.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/HomePage.html`))
    res.status(200)
});
//  Search Page
router.get('/search', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/Search.html`))
    res.status(200)
});
//  About Us Page
router.get('/about-us', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/About_us.html`))
    res.status(200)
});
// Welcome Admin Page
router.get('/adminhome', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/WelcomePageAdmin.html`))
    res.status(200)
});

//  Admin login Page
router.get('/admin-login', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/Admin.html`))
    res.status(200)
});
router.post('/form-submit', function (req, res) {
    console.log(req.method);
    console.log(req.body.email);
    res.status(200);
});

//  List of products in the store
router.get('/product-lists', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/ProductManage1.html`))
    res.status(200)
});
//  Form to add more product
router.get('/product-add', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/ProductManage.html`))
    res.status(200)
});
//  Form to update product
router.get('/product-update', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/ProductUpdate.html`))
    res.status(200)
});
//  Form to add more admin info
router.get('/admin-manage', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/User_Account_Management.html`))
    res.status(200)
});
// page to show all product with picture
router.get('/product-all', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/DetailPage.html`))
    res.status(200)
});
// Detail page of product 1
router.get('/product-one', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/DetailPageOne.html`))
    res.status(200)
});
// Detail page of product 2
router.get('/product-two', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/DetailPageTwo.html`))
    res.status(200)
});
// Detail page of product 3
router.get('/product-three', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/DetailPageThree.html`))
    res.status(200)
});
// Detail page of product 4
router.get('/product-four', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/DetailPageFour.html`))
    res.status(200)
});
// Detail page of product 5
router.get('/product-five', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/DetailPageFive.html`))
    res.status(200)
});
// Detail page of product 6
router.get('/product-six', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/DetailPageSix.html`))
    res.status(200)
});
// Listen on port
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});