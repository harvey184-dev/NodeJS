var express = require('express');
var router = express.Router();
var db = require('../models/database');

router.get('/', function (req, res, next) {
    let sql = `SELECT * FROM loai`;
    db.query(sql, function (err, data) {
        if (err) throw err
        res.render("loai_list", { list: data });
    });
});




router.get('/addnew', function (req, res, next) {
    //res.send('Form thêm loại'); 
    res.render("loai_addnew");
});


router.post('/store', function (req, res) {
    //nhận dữ liệu từ addnew để thêm record vào db
    let tl = req.body.tenLoai;
    let t = req.body.thuTu;
    let ah = req.body.anHien;
    let loai = { tenLoai: tl, thuTu: t, anHien: ah }
    db.query('insert into loai SET ?', loai, function (err, data) {
        if (err) throw err;
        res.redirect("/loai/");
    });
});

router.get('/edit/:id', function (req, res) {
    let id = req.params.id;
    let sql = `SELECT id, tenLoai, thuTu, anHien FROM loai where id=${id}`;
    db.query(sql, function (err, arr) {
        res.render("loai_edit", { loai: arr[0] });
    });
});

router.post('/update/', function (req, res) {
    //nhận dữ liệu từ edit để cập nhật vào db
    let id = req.body.id
    let tenloai = req.body.tenLoai
    let thutu = req.body.thuTu
    let anhien = req.body.anHien
    let sql = `UPDATE loai SET tenLoai=?,thuTu=?, anHien=? WHERE id = ?`
    db.query(sql, [tenloai, thutu, anhien, id], function (err, data) {
        if (data.affectedRows == 0) console.log(`Không có id loại ${id}`);
        res.redirect("/loai/");
    })
});

router.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    let sql = `DELETE FROM loai WHERE id = ?`;
    db.query(sql, [id], function (err, data) {
        if (data.affectedRows == 0) {
            console.log(`Không có loại ${id} để xóa`);
        }
        res.redirect('/loai');
    })
});

module.exports = router;
