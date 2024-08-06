fetch(`http://localhost:3000/hot/15`)
    .then(res => res.json())
    .then(data => {
        let producthot = ``
        data.forEach(p => producthot += product(p))
        document.querySelector('#producthot').innerHTML = producthot
    })

fetch(`http://localhost:3000/all_product`)
    .then(res => res.json())
    .then(data => {
        let allproduct = ``
        data.forEach(p => allproduct += product(p))
        document.querySelector('#productall').innerHTML = allproduct
    })

fetch(`http://localhost:3000/hot/30`)
    .then(res => res.json())
    .then(data => {
        let producthot1 = ``
        data.forEach(p => producthot1 += product(p))
        document.querySelector('#producthot1').innerHTML = producthot1
    })

fetch(`http://localhost:3000/hot/30`)
    .then(res => res.json())
    .then(data => {
        let producthot2 = ``
        data.forEach(p => producthot2 += product(p))
        document.querySelector('#producthot').innerHTML = producthot2
    })

fetch(`http://localhost:3000/new/30`)
    .then(res => res.json())
    .then(data => {
        let productdate = ``
        data.forEach(p => productdate += product(p))
        document.querySelector('#productdate').innerHTML = productdate
    })

fetch(`http://localhost:3000/view/30`)
    .then(res => res.json())
    .then(data => {
        let productview = ``
        data.forEach(p => productview += product(p))
        document.querySelector('#productview').innerHTML = productview
    })

const product = (p) => {
    return `
        <form action="#">
            <input type="hidden" value="${p.id_product}" name="product_id">
            <input type="hidden" value="${p.title_product}" name="product_title">
            <input type="hidden" value="${p.image_product}" name="product_image">
            <input type="hidden" value="${p.price_product}" name="product_price">
            <input type="hidden" value="1" name="product_quantity">
            <div class="grids home_product">
                <div class="grids_in">
                    <div class="content">
                        <div class="img-right-pro">
                            <a href="#">
                                <img class="lazy img-pro content-image pic" src="../public/uploads/product/${p.image_product}"
                                    data-original="image/iphone.png" alt="${p.title_product}" />
                            </a>
                            <div class="content-overlay"></div>
                            <div class="content-details fadeIn-top">
                                ${p.desc_product.replace(/"/g, '\\"')}
                            </div>
                        </div>
                        <div class="name-pro-right">
                            <a href="product.html?id_product=${p.id_product}">
                                <h3>
                                    ${p.title_product}
                                </h3>
                            </a>
                        </div>
                        <div>
                            <input type="submit" style="box-shadow: none" class="btn btn-success btn-sm" name="addcart"
                                value="Đặt hàng" onclick="giohang(${p.id_product})">
                        </div>
                        <div class="price_old_new">
                            <div class="price">
                                <span class="news_price">
                                    ${p.price_product.toLocaleString('vi')}đ
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>`
}
