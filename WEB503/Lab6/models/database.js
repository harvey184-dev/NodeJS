var mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shop'
});
db.connect(() => console.log('Đã kết nối thành công'));
module.exports = db;