// //bai1
//tạo node server
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

//bai3

app.get('/add-inventor', (req, res) => {
    res.send(`
   <h1>Thêm Nhà Khoa Học</h1>
   <form action='/inventor' method='post'>
   <p> <input type='text' name='first' placeholder='First name'></p>
   <p> <input type='text' name='last' placeholder='Last name'></p>
   <p> <input type='number' name='year' placeholder='Birth year '> </p>
   <p> <input type='number' name='passed' placeholder='Passed year'> </p>
   <p> <button type='submit'>Add Inventor</button> </p>
   </form>`);
});
app.post('/inventor', (req, res) => {
    let newInventor = req.body;
    newInventor.id = inventors.length + 1;
    inventors.push(newInventor);
    res.redirect('/inventors');
});
// //routes
app.get("/", (req, res) => {
    res.send("<h1>Đây là trang home</h1>");
});
app.get("/gt", (req, res) => {
    res.send("<h1>Đây là trang giới thiệu</h1>");
});
app.get("/product", (req, res) => {
    res.send("<h1>Đây là trang product</h1>");
});

app.get("/add-product", (req, res) => {
    res.send(`
        <form action='/add-product' method='post'>
            <input type='text' name='productName' placeholder='Product Name'>
            <button type='submit'>Add Product</button>
        </form>
    `);
});

app.post('/add-product', (req, res) => {
    const productName = req.body.productName;
    res.send(`<h2>Product Added:</h2><p>${productName}</p>`);
});



//bai2
const inventors = [
    { id: 1, first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { id: 2, first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { id: 3, first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { id: 4, first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { id: 5, first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { id: 6, first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 }
];

app.get('/inventors', (req, res) => {
    let list = '<h2>Danh sách nhà khoa học</h2><ul>';
    inventors.forEach(e => {
        list += `<li><a style="text-decoration:none;color:green;" href="/inventor/${e.id}">
            ${e.last.toUpperCase()} ${e.first.toUpperCase()} 
            (Born: ${e.year}, Died: ${e.passed})
        </a></li>`;
    });
    list += '</ul>';
    res.send(list);
});

app.get('/inventor/:id', (req, res) => {
    let id = req.params.id;
    inventor = inventors.find(e => e.id == id);
    info = `<h2>
       Thông tin chi tiết nhà khoa học:
       Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year}, Passed: ${inventor.passed}
  </h2>`;
    res.send(info);
});

//start server
app.listen(port, () => {
    console.log(`Ung dung dang chay voi port ${port}`);
});