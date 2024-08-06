fetch('http://localhost:3000/all_product').then(res => res.json()).then(data => {
    let list_product = ``;
    data.forEach(p => list_product += lp(p))
    document.querySelector('#listproduct').innerHTML = list_product
})

fetch('http://localhost:3000/category').then(res => res.json()).then(data => {
    let op = ``
    data.forEach(c => op += op1(c))
    document.querySelector('#category_product').innerHTML = op
})

fetch('http://localhost:3000/category').then(res => res.json()).then(data => {
    let listcategoryproduct = ``
    data.forEach(c => listcategoryproduct += listcategoryproduct1(c))
    document.querySelector('#listcategoryproduct').innerHTML = listcategoryproduct
})

fetch('http://localhost:3000/categorypost').then(res => res.json()).then(data => {
    let listcategorypost = ``
    data.forEach(c => listcategorypost += listcategorypost1(c))
    document.querySelector('#listcategorypost').innerHTML = listcategorypost
})

const listcategorypost1 = (c) => {
    return `<tr>
    <td>
        ${c.id_category_post}
    </td>
    <td>
        ${c.title_category_post}
    </td>
    <td>
        ${c.desc_category_post.replace(/"/g, '\\"')}
    </td>
    <td><a onclick="xoadmbv(${c.id_category_post})">Xóa</a>
        || <a href="edit_category.html?id_category_post=${c.id_category_post}">Cập
            nhật</a></td>
</tr>`
}

const listcategoryproduct1 = (c) => {
    return `<tr>
    <td>
        ${c.id_category_product}
    </td>
    <td>
        ${c.title_category_product}
    </td>
    <td>
        ${c.desc_category_product.replace(/"/g, '\\"')}
    </td>
    <td><a onclick="xoadmsp(${c.id_category_product})">Xóa</a>
        || <a href="edit_category.html?id_category_product=${c.id_category_product}">Cập
            nhật</a></td>
</tr>`
}

const op1 = (c) => {
    return `<option value="${c.id_category_product}">${c.title_category_product}</option>`
}

const lp = (p) => {
    return `<tr>
    <td>
        ${p.id_product}
    </td>
    <td>
        ${p.title_product}
    </td>
    <td><img src="../../../public/uploads/product/${p.image_product}"
        height="100" width="100"></td>
    <td>
        ${p.title_category_product}
    </td>
    <td>
        ${p.price_product.toLocaleString('vi')}đ
    </td>
    <td>
        ${p.quantity_product}
    </td>
    <td>
        ${p.product_hot == 0 ? "Không" : "Có"}
    </td>
    <td><a onclick="xoasp(${p.id_product})">Xóa</a>
        || <a href="edit_product.html?id_product=${p.id_product}">Cập
            nhật</a></td>
</tr>`
}

function xoasp(id_product) {
    fetch(`http://localhost:3000/admin/delete_product/${id_product}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Xóa sản phẩm không thành công');
            }
            return res.json();
        })
        .then(data => {
            console.log(data.message);
            window.location.href = 'list_product.html';
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
}

function xoadmsp(id_category_product) {
    fetch(`http://localhost:3000/admin/delete_category_product/${id_category_product}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Xóa sản phẩm không thành công');
            }
            return res.json();
        })
        .then(data => {
            console.log(data.message);
            window.location.href = 'list_category.html';
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
}

function xoadmbv(id_category_post) {
    fetch(`http://localhost:3000/admin/delete_category_post/${id_category_post}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Xóa sản phẩm không thành công');
            }
            return res.json();
        })
        .then(data => {
            console.log(data.message);
            window.location.href = 'list_category.html';
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
}