var mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'labnodejs'
});
db.connect(() => console.log('Đã kết nối thành công'));
module.exports = db;