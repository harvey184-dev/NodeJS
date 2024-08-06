var express = require('express');
var router = express.Router();
var db = require('./../model/database');

router.get('/get-movies-by-genre/:id', function (req, res) {
  let id = req.params.id;
  sql = `SELECT * FROM phim WHERE id_genre = ${id}`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);;
  })
})

router.put('/update-movie-release-date/:id', function (req, res, next) {
  let data = req.body;
  let id = req.params.id;
  let sql = `UPDATE phim SET ? WHERE id = ?`
  db.query(sql, [data, id], (err, data) => {
    if (err) throw err;
    res.json({ 'Thông báo': 'Sửa ngày thành công' })
  });
})

router.get('/search-movies-by-genre/:genre', function (req, res) {
  let genre = req.params.genre;
  sql = `SELECT * FROM phim JOIN theloai on phim.id_genre = theloai.id WHERE theloai.title = '${genre}'`;
  db.query(sql, function (err, data) {
    if (err) res.json({ 'thông báo': `lỗi ${err}` })
    else res.json(data);
  });
});


module.exports = router;
