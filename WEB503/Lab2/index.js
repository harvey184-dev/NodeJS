const express = require("express");
var app = express();
const port = 3000;
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("./public"))

var listProduct = [{
        id: '0101',
        title: 'Sống Xanh Như Những Lá Trà',
        slug: 'song-xanh-nhu-nhung-la-tra',
        price: 63500,
        description: "Khám phá kho tàng ý tưởng về sự đơn giản,  trí tuệ của người Nhật",
        imageURL: "song-xanh-nhu-nhung-la-tra.png",
    },
    {
        id: '0102',
        title: 'Sống Như Lần Đầu, Yêu Như Lần Cuối',
        slug: 'song-nhu-lan-dau-tien-yeu-thuong-nhu-lan-cuoi',
        price: 52000,
        description: "Những câu chuyện hằng ngày, những hạnh phúc giản dị mà chúng ta dễ bỏ lỡ",
        imageURL: "song-nhu-lan-dau-tien-yeu-thuong-nhu-lan-cuoi.jpg",
    },
    {
        id: '0103',
        title: 'Sức Mạnh Của Sự Tử Tế',
        slug: 'suc-manh-cua-su-tu-te',
        price: 29000,
        description: "Những câu chuyện sâu sắc và ý nghĩa về sự tử tế mỗi ngày",
        imageURL: "suc-manh-cua-su-tu-te.png",
    }
];

app.get("/", (req, res) => {
    var today = new Date();
    currentDay = today.getDay();
    var day = '';
    switch (currentDay) {
        case 0:
            day = 'Chủ nhật';
            break;
        case 1:
            day = 'Thứ hai';
            break;
        case 2:
            day = 'Thứ ba';
            break;
        case 3:
            day = 'Thứ tư';
            break;
        case 4:
            day = 'Thứ năm';
            break;
        case 5:
            day = 'Thứ sáu';
            break;
        case 6:
            day = 'Thứ bảy';
            break;
        default:
            console.log(`Error: ${currentDay}`);
    }
    res.render('home', { kindOfDay: day });
})

app.get("/shop", (req, res) => {
    res.render('shop', { products: listProduct });
})

app.get("/addnew", (req, res) => { res.render("add-product"); });

const formidable = require('formidable');
const fs = require('fs');

app.post("/addnew", (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let pathFile = files.hinhsp[0].filepath;
        let tenFile = files.hinhsp[0].originalFilename;
        let tensp = fields.tensp;
        let giasp = fields.giasp;
        let motasp = fields.motasp;
        let destPath = __dirname + '\\public\\images\\' + tenFile;
        fs.copyFile(pathFile, destPath, (err) => {
            if (err) throw err;
            fs.unlink(pathFile, () => { console.log('Đã xóa file tạm'); });
            console.log('Đã upload xong file ' + tenFile);
        });
        listProduct.push({ id: '0110', title: tensp, price: giasp, description: motasp, imageURL: tenFile, }); //res.send(JSON.stringify({ fields, files,pathFile , destPath}, null, 2));

        res.redirect('/shop');
    });
});

app.get("/detail/:id", (req, res) => {
    let id = req.params.id;
    let sp = listProduct.find(sp => sp.id == id);
    res.render("chitiet", { sp: sp })
});



app.listen(port, () => {
    console.log(`Ung dung dang chay voi port ${port}`);
});