fetch(`http://localhost:3000/category`)
    .then(res => res.json())
    .then(data => {
        let menu = ``
        data.forEach(m => menu += menu1(m))
        document.querySelector('#menu').innerHTML = menu
    })
const menu1 = (m) => {
    return `
        <li class='active has-sub'>
            <a href='category_product.html?id_category_product=${m.id_category_product}'>
                <span>${m.title_category_product}</span>
            </a>
        </li>`
}



fetch(`http://localhost:3000/all_post`)
    .then(res => res.json())
    .then(data => {
        let post2 = ``
        data.forEach(p => post2 += post1(p))
        document.querySelector('#post').innerHTML = post2
    })
const post1 = (p) => {
    return `
        <div class="row">
            <div class="col-md-4 col-xs-4 col-sm-4">
                <img src="../public/uploads/post/${p.image_post}">
            </div>
            <div class="col-md-8 col-xs-8 col-sm-8">
                <h4>
                    <?php echo $post['title_post'] ?>${p.title_post}
                </h4>
                <p>
                    ${p.content_post.replace(/"/g, '').substring(0, 100) + '...'}
                </p>
            </div>
        </div>
        <hr>`
}

