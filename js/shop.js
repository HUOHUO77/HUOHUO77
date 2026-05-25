// ==================== 商城功能 ====================
// 热卖商品
const hotProducts = [
    { name: "苍溪红心猕猴桃礼盒", price: "¥68", img: "https://p2.ssl.qhimgs1.com/sdr/400__/t0156615d11d877a092.jpg", cat: "gift" },
    { name: "剑门豆腐干组合", price: "¥38", img: "https://p2.ssl.qhimgs1.com/sdr/400__/t049cf14e6c995ba1bc.jpg", cat: "tofu" },
    { name: "青川黑木耳", price: "¥28", img: "https://tse3-mm.cn.bing.net/th/id/OIP-C.bwmxqlQq1U4aEZV0gbE5bQHaFT?w=228&h=180&c=7&r=0&o=7&cb=thfc1&dpr=1.3&pid=1.7&rm=3", cat: "special" }
];

// 全部商品
const allProducts = [
    { name: "苍溪红心猕猴桃礼盒", price: "¥68", img: "https://p2.ssl.qhimgs1.com/sdr/400__/t0156615d11d877a092.jpg", cat: "gift", desc: "红心猕猴桃+礼盒" },
    { name: "剑门豆腐干组合", price: "¥38", img: "https://p2.ssl.qhimgs1.com/sdr/400__/t049cf14e6c995ba1bc.jpg", cat: "tofu", desc: "五香/麻辣/泡椒三味" },
    { name: "青川黑木耳", price: "¥28", img: "https://tse3-mm.cn.bing.net/th/id/OIP-C.bwmxqlQq1U4aEZV0gbE5bQHaFT?w=228&h=180&c=7&r=0&o=7&cb=thfc1&dpr=1.3&pid=1.7&rm=3", cat: "special", desc: "国家地理标志" },
    { name: "广元蒸凉面", price: "¥8", img: "https://p0.ssl.qhimgs1.com/sdr/400__/t045f0a038b0bf3b1c0.jpg", cat: "gift", desc: "真空包装，即食" },
    { name: "剑门土蜂蜜", price: "¥98", img: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600", cat: "special", desc: "深山百花蜜" },
    { name: "剑门关冰箱贴", price: "¥58", img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.2pTwboPhftb_AmxLuXsJXAAAAA?w=193&h=193&c=7&r=0&o=7&cb=thfc1&dpr=1.3&pid=1.7&rm=3", cat: "gift", desc: "剑门关/皇泽寺/明月峡主题6枚装" },
    { name: "曾家山高山绿茶", price: "¥188", img: "https://tse4-mm.cn.bing.net/th/id/OIP-C.611x9S0P-oMcB5mjKvVzBAHaE8?w=252&h=180&c=7&r=0&o=7&cb=thfc1&dpr=1.3&pid=1.7&rm=3", cat: "special", desc: "云雾高山茶" },
    { name: "麻辣豆腐干", price: "¥22", img: "https://p2.ssl.qhimgs1.com/sdr/400_/t0169ef94e2f8a46a48.jpg", cat: "tofu", desc: "即食小零食" },
    { name: "五香豆腐干", price: "¥22", img: "https://tse4-mm.cn.bing.net/th/id/OIP-C.6T8-9yYdrFCycC7dfAVccQHaHa?w=203&h=203&c=7&r=0&o=7&cb=thfc1&dpr=1.3&pid=1.7&rm=3", cat: "tofu", desc: "传统工艺" },
    { name: "核桃饼礼盒", price: "¥28", img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.ABmxAJTe9d_bXkrQBUYUDgHaHa?w=178&h=180&c=7&r=0&o=7&cb=thfc1&dpr=1.3&pid=1.7&rm=3", cat: "gift", desc: "酥脆香甜" },
    { name: "剑门土鸡", price: "¥138", img: "https://tse4-mm.cn.bing.net/th/id/OIP-C.gml5K-weRYBPqdTPKbDQNAHaEL?w=309&h=180&c=7&r=0&o=7&cb=thfc1&dpr=1.3&pid=1.7&rm=3", cat: "special", desc: "散养土鸡" }
];

// 渲染热卖榜单
function renderHotScroll() {
    const container = document.getElementById('hotScroll');
    if (container) {
        container.innerHTML = hotProducts.map(p => `
            <div class="hot-card">
                <img class="hot-img" src="${p.img}">
                <div class="hot-content">
                    <div class="hot-name">${p.name}</div>
                    <div class="hot-price">${p.price}</div>
                    <button class="product-btn" data-name="${p.name}">立即购买</button>
                </div>
            </div>
        `).join('');
        attachProductEvents();
    }
}

// 渲染商品列表
function renderProductGrid(filter = 'all') {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    const filtered = filter === 'all' ? allProducts : allProducts.filter(p => p.cat == filter);
    grid.innerHTML = filtered.map(p => `
        <div class="product-card">
            <img class="product-img" src="${p.img}">
            <div class="product-info">
                <div class="product-cat">${p.cat == 'gift' ? '礼盒' : (p.cat == 'tofu' ? '豆腐制品' : '山珍特产')}</div>
                <div class="product-name">${p.name}</div>
                <p style="font-size:0.75rem; color:#aaa;">${p.desc}</p>
                <div class="product-footer">
                    <span class="product-price">${p.price}</span>
                    <button class="product-btn" data-name="${p.name}">购买</button>
                </div>
            </div>
        </div>
    `).join('');
    attachProductEvents();
}

// 绑定商品购买事件
function attachProductEvents() {
    document.querySelectorAll('.product-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = btn.getAttribute('data-name');
            alert(`已将「${name}」加入购物车，客服将联系您。`);
        });
    });
}

// 初始化商城
function initShop() {
    renderHotScroll();
    renderProductGrid('all');
    document.querySelectorAll('.shop-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.shop-filter').forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            renderProductGrid(this.getAttribute('data-filter'));
        });
    });
}