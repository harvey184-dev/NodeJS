fetch('http://localhost:3000/all_post')
    .then(res => res.json())
    .then(data => {
        let allpost = ``
        data.forEach(p => allpost += post(p))
        document.querySelector('#postall').innerHTML = allpost
    })

const post = (p) => {
    return `<li class="lists">
    <div class="img-list">
        <a href="post.html?id_post=${p.id_post}">
            <img src="../public/uploads/post/${p.image_post}" alt="${p.title_post}" class="img-list-in">
        </a>
    </div>
    <div class="content-list">
        <div class="content-list_inm">
            <div class="title-list">
                <h3>
                    <a href="post.html?id_post=${p.id_post}">
                        ${p.title_post}
                    </a>
                </h3>

            </div>
            <div class="content-list-in">
                <p>
                    ${p.content_post.replace(/"/g, '\\"')}
                </p>
            </div>
            <div class="xt"><a href="post.html?id_post=${p.id_post}">Xem
                    thêm</a></div>
        </div>
    </div>
    <div class="clear"></div>
</li>`
}

