const path = require('path')
const formidable = require('express-formidable');
var bodyParser = require('body-parser');
const Shopify = require('@shopify/shopify-api');
const express = require("express")
const app = express();
app.set('port', 8080);
app.use(express.urlencoded({
    extended: false
}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: false}));
app.use(formidable());

app.get('/', async function (req, res) { 
    res.render(path.join(__dirname, '/views/index.html'))
});

app.get('/products', async function (req, res) {
    const response = await fetch("https://andres-development-stores.myshopify.com/admin/api/2022-10/collections/290714124450/products.json", {
        headers: {
          "X-Shopify-Access-Token": "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"
        }
    })
    const data = await response.json()
    res.send(data);
    console.log(data)
});

app.post('/productadd', async function (req, res) { 
    
    const values = Object.values(req.fields)
    const names = Object.keys(req.fields)
    var index = 0
    var product = []
    for (const value of values) {
        var name = names[index]
        product[index] = `${name}: ${value}`
        index++
    }
    res.send(product)
    // const response = await fetch("https://andres-development-stores.myshopify.com/admin/api/2022-10/products.json", {
    // body: `
    // {
    //     "product":{
    //         "title":"Burton Custom Freestyle 151",
    //         "body_html":"<strong>Good snowboard!</strong>",
    //         "vendor":"Burton",
    //         "product_type":"Snowboard",
    //         "tags":["Barnes & Noble","Big Air","Johns Fav"]
    //     }
    // }`,
    // headers: {
    //     "Content-Type": "application/json",
    //     "X-Shopify-Access-Token": "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"
    // },
    // method: "POST"
    // })
    // const data = await response.json()
    // res.send(data);
});

app.listen(app.get('port'), function () {
    console.log(`Example app listening on port ${app.get('port')}!`);
});