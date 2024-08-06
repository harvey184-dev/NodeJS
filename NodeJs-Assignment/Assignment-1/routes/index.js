var db = require('../models/database')
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  let sql = `
  SELECT * FROM tbl_category_product ORDER BY id_category_product ASC;
  SELECT * FROM tbl_product ORDER BY tbl_product.id_product DESC;
  SELECT * FROM tbl_post ORDER BY id_post DESC LIMIT 5;
  `;
  db.query(sql, (err, data) => {
    if (err) throw err;
    let datadm = data[0]
    let datasp = data[1]
    let databv = data[2]
    res.render('home', { danhmuc: datadm, sanpham: datasp, baiviet: databv })
  });
});

router.get('/tatcasanpham', (req, res) => {
  let sql = `
  SELECT * FROM tbl_category_product ORDER BY id_category_product ASC;
  SELECT * FROM tbl_product ORDER BY tbl_product.id_product DESC;
  `;
  db.query(sql, (err, data) => {
    if (err) throw err;
    let datadm = data[0]
    let datasp = data[1]
    res.render('list-product', { danhmuc: datadm, sanpham: datasp })
  });
});

router.get('/tintuc', (req, res) => {
  let sql = `
  SELECT * FROM tbl_category_product ORDER BY id_category_product ASC;
  SELECT * FROM tbl_post ORDER BY id_post DESC;
  `;
  db.query(sql, (err, data) => {
    if (err) throw err;
    let datadm = data[0]
    let databv = data[1]
    res.render('list-post', { danhmuc: datadm, baiviet: databv })
  });
});

router.get('/chitietsanpham/:id', (req, res) => {
  let id = req.params.id;
  let sql = `
  SELECT * FROM tbl_category_product ORDER BY id_category_product ASC;
  SELECT * FROM tbl_product, tbl_category_product WHERE tbl_product.id_category_product=tbl_category_product.id_category_product AND tbl_product.id_product=${id}
  `;
  db.query(sql, (err, data) => {
    if (err) throw err;
    let datadm = data[0];
    let datasp = data[1];
    res.render("details-product", { danhmuc: datadm, sanpham: datasp[0] });
  });
});

router.get('/chitiettintuc/:id', (req, res) => {
  let id = req.params.id;
  let sql = `
  SELECT * FROM tbl_category_product ORDER BY id_category_product ASC;
  SELECT * FROM tbl_post, tbl_category_post WHERE tbl_post.id_category_post=tbl_category_post.id_category_post AND tbl_post.id_post=${id}
  `;
  db.query(sql, (err, data) => {
    if (err) throw err;
    let datadm = data[0];
    let databv = data[1];
    res.render("details-post", { danhmuc: datadm, baiviet: databv[0] });
  });
});

router.get('/danhmucsanpham/:id', (req, res) => {
  let id = req.params.id;
  let sql = `
  SELECT * FROM tbl_category_product ORDER BY id_category_product ASC;
  SELECT tbl_category_product.title_category_product, tbl_product.* FROM tbl_category_product JOIN tbl_product ON tbl_category_product.id_category_product = tbl_product.id_category_product
where tbl_category_product.id_category_product=${id} ;
  `;
  db.query(sql, (err, data) => {
    if (err) throw err;
    let datadm = data[0];
    let datasp = data[1];
    res.render("categoryproduct", { danhmuc: datadm, sanpham1: datasp[0], sanpham: datasp });
  });
});

router.get('/danhmuctintuc/:id', (req, res) => {
  let id = req.params.id;
  let sql = `
  SELECT * FROM tbl_category_post ORDER BY id_category_post ASC;
  SELECT tbl_category_post.title_category_post, tbl_post.* FROM tbl_category_post JOIN tbl_post ON tbl_category_post.id_category_post = tbl_post.id_category_post
ORDER BY tbl_category_post.id_category_post=${id} ;
  `;
  db.query(sql, (err, data) => {
    if (err) throw err;
    let datadm = data[0];
    let databv = data[1];
    res.render("categorypost", { danhmuc: datadm, baiviet1: databv[0], baiviet: databv });
  });
});


module.exports = router;
