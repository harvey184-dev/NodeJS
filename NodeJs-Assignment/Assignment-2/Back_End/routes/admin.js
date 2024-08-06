var db = require('../models/database');

var md5 = require('md5')
var express = require('express');
var router = express.Router();

// thêm danh mục sản phẩm 
router.post('/add_category_product', function (req, res, next) {
    let data = req.body;
    let sql = `INSERT INTO tbl_category_product SET ?`
    db.query(sql, data, function (err, data) {
        if (err) throw err;
        res.json({ 'Thông báo': 'Thêm danh mục sản phẩm thành công' })
    })
})

// xóa danh mục sản phẩm
router.delete('/delete_category_product/:id', function (req, res, next) {
    let id = req.params.id;
    let sql = 'DELETE FROM tbl_category_product WHERE id_category_product = ?'
    db.query(sql, id, (err, data) => {
        if (err) throw err;
        res.json({ 'Thông báo': 'Xóa danh mục sản phẩm thành công' })
    });
})

// sửa danh mục sản phẩm
router.put('/edit_category_product/:id', function (req, res, next) {
    let data = req.body;
    let id = req.params.id;
    let sql = `UPDATE tbl_category_product SET ? WHERE id_category_product = ?`
    db.query(sql, [data, id], (err, data) => {
        if (err) throw err;
        res.json({ 'Thông báo': 'Sửa danh mục sản phẩm thành công' })
    });
})

// thêm sản phẩm 
router.post('/add_product', function (req, res, next) {
    let data = req.body;
    let sql = `INSERT INTO tbl_product SET ?`
    db.query(sql, data, function (err, data) {
        if (err) throw err;
        res.json({ 'Thông báo': 'Thêm sản phẩm thành công' })
    })
})

// xóa sản phẩm
router.delete('/delete_product/:id', function (req, res, next) {
    let id = req.params.id;
    let sql = 'DELETE FROM tbl_product WHERE id_product = ?'
    db.query(sql, id, (err, data) => {
        if (err) throw err;
        res.json({ 'Thông báo': 'Xóa sản phẩm thành công' })
    });
})

// sửa sản phẩm
router.put('/edit_product/:id', function (req, res, next) {
    let data = req.body;
    let id = req.params.id;
    let sql = `UPDATE tbl_product SET ? WHERE id_product = ?`
    db.query(sql, [data, id], (err, data) => {
        if (err) throw err;
        res.json({ 'Thông báo': 'Sửa sản phẩm thành công' })
    });
})

// thêm danh mục bài viết 
router.post('/add_category_post', function (req, res, next) {
    let data = req.body;
    let sql = `INSERT INTO tbl_category_post SET ?`
    db.query(sql, data, function (err, data) {
        if (err) throw err;
        res.json({ 'Thông báo': 'Thêm danh mục bài viết thành công' })
    })
})

// xóa danh mục bài viết
router.delete('/delete_category_post/:id', function (req, res, next) {
    let id = req.params.id;
    let sql = 'DELETE FROM tbl_category_post WHERE id_category_post = ?'
    db.query(sql, id, (err, data) => {
        if (err) throw err;
        res.json({ 'Thông báo': 'Xóa danh mục bài viết thành công' })
    });
})

// sửa danh mục bài viết
router.put('/edit_category_post/:id', function (req, res, next) {
    let data = req.body;
    let id = req.params.id;
    let sql = `UPDATE tbl_category_post SET ? WHERE id_category_post = ?`
    db.query(sql, [data, id], (err, data) => {
        if (err) throw err;
        res.json({ 'Thông báo': 'Sửa danh mục bài viết thành công' })
    });
})

// thêm bài viết
router.post('/add_post', function (req, res, next) {
    let data = req.body;
    let sql = `INSERT INTO tbl_post SET ?`
    db.query(sql, data, function (err, data) {
        if (err) throw err;
        res.json({ 'Thông báo': 'Thêm bài viết thành công' })
    })
})

// xóa bài viết
router.delete('/delete_post/:id', function (req, res, next) {
    let id = req.params.id;
    let sql = 'DELETE FROM tbl_post WHERE id_post = ?'
    db.query(sql, id, (err, data) => {
        if (err) throw err;
        res.json({ 'Thông báo': 'Xóa bài viết thành công' })
    });
})

// sửa bài viết
router.put('/edit_post/:id', function (req, res, next) {
    let data = req.body;
    let id = req.params.id;
    let sql = `UPDATE tbl_post SET ? WHERE id_post = ?`
    db.query(sql, [data, id], (err, data) => {
        if (err) throw err;
        res.json({ 'Thông báo': 'Sửa bài viết thành công' })
    });
})

router.get('/login_admin', function (req, res) {
    let sql = `SELECT * FROM tbl_admin`
    db.query(sql, function (err, data) {
        if (err) res.json({ 'thông báo': `lỗi ${err}` })
        else res.json(data);;
    })
});

router.post('/order', function (req, res, next) {
    let order = req.body;
    let sql = `INSERT INTO tbl_order SET ?`
    db.query(sql, order, function (err, data) {
        if (err) throw err;
        res.json({ 'Thông báo': 'Đã đặt hàng' })
    })
})

router.post('/order_details', function (req, res, next) {
    let order_details = req.body;
    let sql = `INSERT INTO tbl_order_details SET ?`
    db.query(sql, order_details, function (err, data) {
        if (err) throw err;
        res.json({ 'Thông báo': 'Đã đặt hàng' })
    })
})

router.get('/', function (req, res) {
    res.render('dashboard')
})

router.get('/add_category_post', function (req, res) {
    res.render('post/add_category')
})

router.get('/add_post', function (req, res) {
    res.render('post/add_post')
})

router.get('/list_category_post', function (req, res) {
    res.render('post/list_category')
})

router.get('/list_post', function (req, res) {
    res.render('post/list_post')
})

router.get('/edit_category_post/:id', function (req, res) {
    res.render('post/edit_category')
})

router.get('/edit_post/:id', function (req, res) {
    res.render('post/edit_post')
})

module.exports = router;
