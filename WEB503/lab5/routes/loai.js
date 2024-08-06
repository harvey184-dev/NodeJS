var express = require('express');
var router = express.Router();
var db = require('./../models/database');

router.get('/', function (req, res) {
    let sql = `SELECT * FROM loai`;
    db.query(sql, function (err, data) {
        res.json(data);
    });
});

router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    let sql = 'SELECT * FROM loai WHERE id = ?'
    db.query(sql, id, (err, d) => {
        if (d.affectedRows == 0) {
            console.log(`Không có loại ${id} để xem`);
        }
        res.json(d[0]);
    });
});

router.post('/addnew', function (req, res, next) {
    let data = req.body;
    let sql = 'INSERT INTO loai SET ?';
    db.query(sql, data, (err, d) => {
        if (err) throw err;
        res.json({ "thongbao": "Đã chèn xong sách" });
    });
});

router.put('/update/:id', function (req, res, next) {
    let data = req.body;
    let id = req.params.id;
    let sql = 'UPDATE loai SET ? WHERE id = ?';
    db.query(sql, [data, id], (err, d) => {
        if (d.affectedRows == 0) {
            console.log(`Không có loại ${id} để cập nhập`);
        }
        res.json({ "thongbao": 'Đã cập nhật sách' });
    });
});

router.delete('/delete/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'DELETE FROM loai WHERE id = ?'
    db.query(sql, id, (err, d) => {
        if (d.affectedRows == 0) {
            console.log(`Không có loại ${id} để xóa`);
        }
        res.json({ "thongbao": 'Đã xóa thành công' });
    });
});

module.exports = router;