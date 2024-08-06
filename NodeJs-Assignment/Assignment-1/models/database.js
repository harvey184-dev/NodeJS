var mysql = require('mysql'); // nhúng module mysql vào trang
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pdo_blogs_ecommerce',  //tên database muốn kế
    multipleStatements: true
});

db.connect(function (err) {
    if (err) { console.log('Loi ket noi database', err); db.end(); }
    else console.log('Da ket noi database');
});

module.exports = db;