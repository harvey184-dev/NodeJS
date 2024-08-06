var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

router.get("/them", (req, res) => {
  res.render('themloai');
});

router.get("/themtin", async (req, res) => {
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');

  const db = client.db('tintuc');
  const loaitin = db.collection('loaitin');
  let myquery = {};
  const arr = await loaitin.find(myquery).toArray();
  client.close();
  res.render("themtin", { listloaitin: arr });
});

router.post("/addtin", async (req, res) => {
  const { idTin, tieuDe, noiDung, thuTu, anhien, idLoai } = req.body;
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Kết nối thành công đến server');

    const db = client.db('tintuc');
    const tin = db.collection('tin');

    const anhienBool = (anhien === 'true');

    const newTin = {
      idTin: parseInt(idTin),
      tieuDe: tieuDe,
      noiDung: noiDung,
      thuTu: parseInt(thuTu),
      anhien: anhienBool,
      idLoai: parseInt(idLoai)
    };

    const result = await tin.insertOne(newTin);
    console.log("result =", result);

    res.redirect('tin')
  } catch (error) {
    console.error("Lỗi khi thêm tin mới:", error);
    res.status(500).send('Đã xảy ra lỗi khi thêm tin mới.');
  } finally {
    client.close();
  }
});


router.post("/add", async (req, res) => {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Kết nối thành công đến server');

    const db = client.db('tintuc');
    const loaitin = db.collection('loaitin');

    const { idLoai, tenLoai, thuTu, anhien } = req.body;
    const doc1 = { idLoai: parseInt(idLoai), tenLoai, thuTu: parseInt(thuTu), anhien: anhien === 'true' };

    const insertResult = await loaitin.insertOne(doc1);
    res.redirect('/listloaitin')
  } catch (error) {
    console.error("Lỗi khi chèn loại tin:", error);
    res.status(500).send('Đã xảy ra lỗi khi chèn loại tin.');
  } finally {
    client.close();
  }
});

//routes/index.js
router.get("/listloaitin", async (req, res) => {
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');

  const db = client.db('tintuc');
  const loaitin = db.collection('loaitin');
  let myquery = {};
  const arr = await loaitin.find(myquery).toArray();
  client.close();
  res.render("loaitin", { listloaitin: arr });
});

router.get("/tin", async (req, res) => {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Kết nối thành công đến server');

    const db = client.db('tintuc');
    const tin = db.collection('tin');

    // Truy vấn tất cả các tin từ cơ sở dữ liệu
    const tinList = await tin.find({}).toArray();

    // Truyền danh sách tin cho trang HTML để hiển thị
    res.render("tin", { listtin: tinList });
  } catch (error) {
    console.error("Lỗi khi truy vấn danh sách tin:", error);
    res.status(500).send('Đã xảy ra lỗi khi truy vấn danh sách tin.');
  } finally {
    client.close();
  }
});


//routes/index.js
router.get("/chitietloai/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');

  const db = client.db('tintuc');
  const loaitin = db.collection('loaitin');
  let myquery = { idLoai: id };
  let data = await loaitin.findOne(myquery);
  res.render("chitietloai", { loaitin: data });
  client.close();
})

router.get("/chitiettin/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');

  const db = client.db('tintuc');
  const tin = db.collection('tin');
  let myquery = { idTin: id };
  let data = await tin.findOne(myquery);
  res.render("chitiettin", { tin: data });
  client.close();
})


router.get("/edit/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Kết nối thành công đến server');

    const db = client.db('tintuc');
    const loaitin = db.collection('loaitin');

    let myquery = { idLoai: id };
    let data = await loaitin.findOne(myquery);
    res.render("sualoai", { loaitin: data });
  } catch (error) {
    console.error("Lỗi khi truy xuất dữ liệu:", error);
    res.status(500).send('Đã xảy ra lỗi khi truy xuất dữ liệu.');
  } finally {
    client.close();
  }
});

router.post("/update/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Kết nối thành công đến server');

    const db = client.db('tintuc');
    const loaitin = db.collection('loaitin');

    const { tenLoai, thuTu, anhien } = req.body;
    const query = { idLoai: id };
    const updateValues = { $set: { "tenLoai": tenLoai, "thuTu": thuTu, "anhien": anhien === 'true' } };

    const result = await loaitin.updateOne(query, updateValues);
    console.log("result =", result);

    res.redirect(`/chitietloai/${id}`)
  } catch (error) {
    console.error("Lỗi khi cập nhật loại tin:", error);
    res.status(500).send('Đã xảy ra lỗi khi cập nhật loại tin.');
  } finally {
    client.close();
  }
});

router.get("/edittin/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Kết nối thành công đến server');

    const db = client.db('tintuc');
    const tin = db.collection('tin');
    const loaitin = db.collection('loaitin');

    let myquery = { idTin: id };
    let data = await tin.findOne(myquery);
    let cursor = await loaitin.find({});
    let data1 = await cursor.toArray();
    res.render("suatin", { tin: data, loaitin: data1 });
  } catch (error) {
    console.error("Lỗi khi truy xuất dữ liệu:", error);
    res.status(500).send('Đã xảy ra lỗi khi truy xuất dữ liệu.');
  } finally {
    client.close();
  }
});

router.post("/updatetin/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Kết nối thành công đến server');

    const db = client.db('tintuc');
    const tin = db.collection('tin');

    const { tieuDe, noiDung, thuTu, anhien, idLoai } = req.body;
    const query = { idTin: id };
    const updateValues = {
      $set: {
        "tieuDe": tieuDe,
        "noiDung": noiDung,
        "thuTu": thuTu,
        "anhien": anhien === 'true',
        "idLoai": idLoai
      }
    };

    const result = await tin.updateOne(query, updateValues);
    console.log("result =", result);

    res.redirect(`/chitiettin/${id}`);
  } catch (error) {
    console.error("Lỗi khi cập nhật tin:", error);
    res.status(500).send('Đã xảy ra lỗi khi cập nhật tin.');
  } finally {
    client.close();
  }
});

router.get("/deletetin/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');

  const db = client.db('tintuc');
  const tin = db.collection('tin');
  let myquery = { "idTin": id };
  const kq = await tin.deleteOne(myquery);
  res.redirect('/tin')
  client.close();
});

router.get("/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  console.log('Kết nối thành công đến server');

  const db = client.db('tintuc');
  const loaitin = db.collection('loaitin');
  let myquery = { "idLoai": id };
  const kq = await loaitin.deleteOne(myquery);
  res.redirect('/listloaitin')
  client.close();
});



module.exports = router;
