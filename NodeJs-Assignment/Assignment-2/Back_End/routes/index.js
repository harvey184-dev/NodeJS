var db = require('../models/database');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// hiện thị sản phẩm mới
router.get('/new/:ssp', function (req, res) {
  if (isNaN(req.params.ssp) == true) {
    res.json({ 'thông báo': 'Sai tham số' })
    return;
  }
  let ssp = req.params.ssp; if (ssp <= 10);
  let sql = `SELECT * FROM tbl_product ORDER BY date desc LIMIT 0,${ssp}`
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị theo số lượng vỉew
router.get('/view/:ssp', function (req, res) {
  if (isNaN(req.params.ssp) == true) {
    res.json({ 'thông báo': 'Sai tham số' })
    return;
  }
  let ssp = req.params.ssp; if (ssp <= 10);
  let sql = `SELECT * FROM tbl_product ORDER BY view desc LIMIT 0,${ssp}`
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị theo sản phẩm hot
router.get('/hot/:ssp', function (req, res) {
  if (isNaN(req.params.ssp) == true) {
    res.json({ 'thông báo': 'Sai tham số' })
    return;
  }
  let ssp = req.params.ssp; if (ssp <= 10);
  let sql = `SELECT * FROM tbl_product WHERE product_hot = 1 ORDER BY date desc LIMIT 0,${ssp}`
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị chi tiết sản phẩm
router.get('/detail_product/:id', function (req, res) {
  let id = req.params.id;
  sql = `SELECT * FROM tbl_product, tbl_category_product WHERE tbl_product.id_category_product=tbl_category_product.id_category_product AND tbl_product.id_product=${id}`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị tất cả sản phẩm
router.get('/all_product', function (req, res) {
  sql = `SELECT * FROM tbl_product, tbl_category_product WHERE tbl_product.id_category_product=tbl_category_product.id_category_product ORDER BY date DESC`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị sản phẩm theo danh mục
router.get('/category_product/:id', function (req, res) {
  let id = req.params.id;
  sql = `SELECT tbl_category_product.title_category_product, tbl_product.* FROM tbl_category_product JOIN tbl_product ON tbl_category_product.id_category_product = tbl_product.id_category_product where tbl_category_product.id_category_product =${id}`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị danh mục sản phẩm
router.get('/category', function (req, res) {
  sql = `SELECT * FROM tbl_category_product ORDER BY id_category_product ASC`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị danh mục bài viết
router.get('/categorypost', function (req, res) {
  sql = `SELECT * FROM tbl_category_post ORDER BY id_category_post ASC`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị danh mục sản phẩm theo id
router.get('/category/:id', function (req, res) {
  let id = req.params.id;
  sql = `SELECT * FROM tbl_category_product WHERE id_category_product = ${id} `;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị danh mục bài viết theo id
router.get('/categorypost/:id', function (req, res) {
  let id = req.params.id;
  sql = `SELECT * FROM tbl_category_post WHERE id_category_post = ${id} `;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị sản phẩm liên quan
router.get('/lienquan/:id', function (req, res) {
  let id = req.params.id;
  sql = `SELECT * FROM tbl_product JOIN tbl_category_product ON tbl_product.id_category_product = tbl_category_product.id_category_product WHERE tbl_product.id_category_product = ( SELECT id_category_product  FROM  tbl_product WHERE id_product = ${id} ) AND tbl_product.id_product != ${id} LIMIT 4;`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})


// Hiển thị bài viết theo danh mục
router.get('/category_post/:id', function (req, res) {
  let id = req.params.id;
  sql = `SELECT tbl_category_post.title_category_post, tbl_post.* FROM tbl_category_post JOIN tbl_post ON tbl_category_post.id_category_post = tbl_post.id_category_post where tbl_category_post.id_category_post =${id}`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiện thị chi tiết bài viết 
router.get('/detail_post/:id', function (req, res) {
  let id = req.params.id;
  sql = `SELECT * FROM tbl_post, tbl_category_post WHERE tbl_post.id_category_post=tbl_category_post.id_category_post AND tbl_post.id_post=${id}`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

// Hiển thị tất cả bài viết
router.get('/all_post', function (req, res) {
  sql = `SELECT * FROM tbl_post, tbl_category_post WHERE tbl_post.id_category_post=tbl_category_post.id_category_post ORDER BY id_post DESC`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

router.get('/order', function (req, res) {
  sql = `SELECT * FROM tbl_order`
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

router.get('/order_details/:id', function (req, res) {
  let id = req.params.id
  sql = `SELECT * FROM tbl_product,tbl_order_details WHERE tbl_product.id_product=tbl_order_details.product_id AND tbl_order_details.order_code=${id}`
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})



router.get('/login', function (req, res) {
  sql = `SELECT * FROM tbl_customers`
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})


router.post('/addlogin', function (req, res, next) {
  let order_details = req.body;
  let sql = `INSERT INTO tbl_customers SET ?`
  db.query(sql, order_details, function (err, data) {
    if (err) throw err;
    res.json({ 'Thông báo': 'Đăng ký thành công' })
  })
})


module.exports = router;
