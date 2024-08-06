var express = require('express');
var router = express.Router();
var db = require('../models/database')

router.get('/danhsachuser', (req, res) => {
  res.render("listusers");
});

router.get('/chitietuser/:id', (req, res) => {
  let id = req.params.id;
  res.render("chitietuser", { id: id });
});

router.get('/dangky', (req, res) => {
  res.render("dangky");
});

router.get('/ax1', (req, res) => {
  res.render("ax1_listusers");
});

router.get('/ax1', (req, res) => {
  res.render("ax1_listusers");
});

router.get('/update/:idUser', (req, res) => {
  let idUser = req.params.idUser;
  res.render('update')
});

router.get('/delete/:idUser', function (req, res) {
  let idUser = req.params.idUser;
  let sql = `DELETE FROM users WHERE idUser = ?`;
  db.query(sql, [idUser], function (err, data) {
    if (data.affectedRows == 0) {
      console.log(`Không có loại ${idUser} để xóa`);
    }
    res.redirect('/danhsachuser');
  })
});

module.exports = router;
