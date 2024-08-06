var express = require('express');
var router = express.Router();
var db = require('../models/database');

router.get('/', function (req, res, next) {
    let sql = `SELECT * FROM sach`;
    db.query(sql, function (err, data) {
        if (err) throw err
        res.render("sach_list", { list: data });
    });
});

router.get('/addnew', function (req, res, next) {
    let sql = `SELECT * FROM loai`
    db.query(sql, function (err, data) {
        if (err) throw err
        res.render("sach_addnew", { loai: data });
    })
});

router.post('/store', function (req, res) {
    //nhận dữ liệu từ addnew để thêm record vào db
    let ts = req.body.tensach;
    let mt = req.body.mota;
    let a = req.body.anh;
    let cn = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let g = req.body.gia;
    let l = req.body.loai;
    let ah = req.body.anHien;
    let sach = { tenSach: ts, moTa: mt, urlHinh: a, capNhat: cn, gia: g, idLoai: l, anHien: ah }
    db.query('insert into sach SET ?', sach, function (err, data) {
        if (err) throw err;
        res.redirect("/sach/");
    });
});

router.get('/edit/:id', function (req, res) {
    let id = req.params.id;
    let sql = `SELECT * FROM sach where id=${id};`
    db.query(sql, function (err, arr) {
        if (err) throw err
        res.render("sach_edit", { sach: arr[0] });
    });
});


router.post('/update/', function (req, res) {
    let ts = req.body.tensach;
    let mt = req.body.mota;
    let a = req.body.anh;
    let cn = new Date().toLocaleString('vi');
    let g = req.body.gia;
    let l = req.body.loai;
    let ah = req.body.anHien;
    let sql = `UPDATE sach SET tenSach=?,moTa=?,urlHinh=?,capNhat=?,gia=?,idLoai=?,anHien=? WHERE id = ?`
    db.query(sql, [tenSach, moTa, urlHinh, capNhat, gia, idLoai, anHien], function (err, data) {
        if (data.affectedRows == 0) console.log(`Không có id sách ${id}`);
        res.redirect("/sach/");
    })
});

router.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    let sql = `DELETE FROM sach WHERE id = ?`;
    db.query(sql, [id], function (err, data) {
        if (data.affectedRows == 0) {
            console.log(`Không có loại ${id} để xóa`);
        }
        res.redirect('/sach');
    })
});

module.exports = router;
