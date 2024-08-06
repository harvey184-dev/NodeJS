const express = require('express');
const res = require('express/lib/response');
var app = express();
const port = 3000;
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static('public'))


var mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'labnodejs'
});


app.get("/", (r1, r2) => {
    let sql = "SELECT id, tenLoai FROM loai";
    let sqlSach = "SELECT sach.id, tenSach, moTa, urlHinh, gia, tenLoai FROM sach JOIN loai ON sach.idLoai = loai.id";

    db.query(sql, (err, listLoai) => {
        if (err) throw err;
        db.query(sqlSach, (err, listSach) => {
            if (err) throw err;
            r2.render('shop', { loaiSach: listLoai, listSach: listSach });
        });
    });
})

app.get("/cat/:cateId", (req, res) => {
    let id = req.params.cateId;
    let sql = `select * from loai`;
    let sqlSach = `select * from sach WHERE idLoai=${id}`;
    db.query(sql, function (err, listLoai) {
        db.query(sqlSach, function (err, listSach) {
            if (err) throw err;
            res.render('shop', { loaiSach: listLoai, listSach: listSach });
        });
    });
})

app.get("/book/:id", (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM sach WHERE id=${id}`;
    db.query(sql, (err, book) => {
        if (err) throw err;
        res.render("book", { book: book[0] });
    });
});

app.listen(port, () => {
    console.log(`Ung dung dang chay voi port ${port}`);
});

