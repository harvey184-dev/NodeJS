var db = require('../models/database')
var express = require('express');
var router = express.Router();

router.get("/", (req, res) => { res.render("cpanel/dashboard", { layout: 'cpanel/layout' }); });

router.get('/danhsachsanpham', function (req, res) {
    sql = `SELECT * FROM tbl_product,tbl_category_product WHERE tbl_product.id_category_product=tbl_category_product.id_category_product ORDER BY tbl_product.id_product DESC`
    db.query(sql, (err, data) => {
        if (err) throw err;
        res.render('cpanel/product/list_product', { layout: 'cpanel/layout', product: data });
        // ở đây, chúng ta đã đặt layout cho trang này là 'cpanel/admin_layout'
    })
})

router.get('/danhmucsanpham', function (req, res) {
    sql = `SELECT * FROM tbl_category_product ORDER BY id_category_product ASC`
    db.query(sql, (err, data) => {
        if (err) throw err;
        res.render('cpanel/product/list_category', { layout: 'cpanel/layout', category: data });
    })
})

router.get('/xoasanpham/:id', function (req, res) {
    let id = req.params.id;
    let sql = `DELETE FROM tbl_product WHERE id_product = ?`;
    db.query(sql, [id], function (err, data) {
        if (data.affectedRows == 0) {
            console.log(`Không có loại ${id} để xóa`);
        }
        res.redirect('/admin/danhsachsanpham');
    })
});

router.get('/xoadanhmucsanpham/:id', function (req, res) {
    let id = req.params.id;
    let sql = `DELETE FROM tbl_category_product WHERE id_category_product = ?`;
    db.query(sql, [id], function (err, data) {
        if (data.affectedRows == 0) {
            console.log(`Không có loại ${id} để xóa`);
        }
        res.redirect('/admin/danhsachsanpham');
    })
});

router.get('/editsanpham/:id', function (req, res) {
    let id = req.params.id;
    let sql = `SELECT * FROM tbl_product WHERE id_product = ${id};
               SELECT * FROM tbl_category_product ORDER BY id_category_product ASC`;
    db.query(sql, function (err, data) {
        if (err) throw err;
        res.render('cpanel/product/edit_product', { layout: 'cpanel/layout', sanpham: data[0][0], category: data[1] });
    });
});



module.exports = router;