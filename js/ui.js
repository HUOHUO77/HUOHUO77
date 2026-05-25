// ==================== UI 交互功能 ====================
let currentSlide = 0;
let slideInterval;

// 构建轮播图
function buildCarousel() {
    const slidesDiv = document.getElementById('carouselSlides');
    const dotsDiv = document.getElementById('carouselDots');
    if (!slidesDiv) return;
    
    slidesDiv.innerHTML = '';
    dotsDiv.innerHTML = '';
    
    carouselData.forEach((item, idx) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide' + (idx === 0 ? ' active' : '');
        slide.style.backgroundImage = `url('${item.bg}')`;
        slide.innerHTML = `
            <div class="carousel-overlay"></div>
            <div class="carousel-content">
                <h2 class="carousel-title">${item.title}</h2>
                <div class="carousel-subtitle">${item.subtitle}</div>
                <p class="carousel-description">${item.desc}</p>
            </div>
        `;
        slidesDiv.appendChild(slide);
        
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsDiv.appendChild(dot);
    });
    updateIndicator();
    startAutoSlide();
}

function goToSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!slides.length) return;
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    updateIndicator();
    resetAutoSlide();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function updateIndicator() {
    const ind = document.getElementById('carouselIndicator');
    if (ind) ind.innerText = `${currentSlide + 1}/${carouselData.length}`;
}

function startAutoSlide() { slideInterval = setInterval(nextSlide, 5000); }
function resetAutoSlide() { clearInterval(slideInterval); startAutoSlide(); }

// 显示通知
function showNotification(msg) {
    const notif = document.getElementById('notification');
    if (notif) {
        notif.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
        notif.classList.add('show');
        setTimeout(() => notif.classList.remove('show'), 2500);
    }
}

// 无障碍模式切换
function toggleAccessibility() {
    document.body.classList.toggle('accessibility-mode');
    showNotification(document.body.classList.contains('accessibility-mode') ? '无障碍模式已开启' : '已关闭无障碍模式');
}

// 关闭移动端菜单
function closeMobile() {
    document.getElementById('mobileNavOverlay').classList.remove('active');
}

// 景点详情弹窗
function showModal(id) {
    const a = allAttractions.find(x => x.id == id);
    if (!a) return;
    document.getElementById('modalImage').src = a.img;
    document.getElementById('modalTitle').innerText = a.name;
    document.getElementById('modalTag').innerText = a.tag;
    document.getElementById('modalRating').innerText = a.rating + ' ★';
    document.getElementById('modalPrice').innerText = a.price;
    document.getElementById('modalTime').innerText = a.hours;
    document.getElementById('modalDescription').innerHTML = `
        <p>${a.fullDesc}</p>
        <p><strong>交通：</strong>${a.traffic}</p>
        ${a.lnglat ? `<p style="margin-top:10px;">
            <button class="btn-detail-sm" onclick="navigateTo('${a.name}', ${a.lnglat[0]}, ${a.lnglat[1]})"><i class="fas fa-directions"></i> 导航去这里</button>
            <button class="btn-detail-sm" onclick="buyTicket('${a.name}')"><i class="fas fa-ticket-alt"></i> 购票</button>
            <button class="btn-detail-sm" onclick="flyToMap('${a.id}'); document.getElementById('attractionModal').style.display='none';"><i class="fas fa-map-marked-alt"></i> 在地图中查看</button>
        </p>` : ''}
    `;
    document.getElementById('attractionModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 跳转到地图并定位景点
function flyToMap(id) {
    const attr = allAttractions.find(x => x.id == id);
    if (!attr || !attr.lnglat) return;
    showPage('smartmap');
    setTimeout(() => {
        if (amapInstance) amapInstance.setZoomAndCenter(14, attr.lnglat);
        else initSmartMap();
    }, 500);
}

// 渲染景点列表
function renderAttractions() {
    const grid = document.getElementById('attractionsGrid');
    if (grid) {
        grid.innerHTML = allAttractions.map(a => `
            <div class="attraction-card">
                <img class="attraction-img" src="${a.img}">
                <div class="attraction-content">
                    <h3 class="attraction-title"><a href="${a.link}" target="_blank" class="attraction-name-link">${a.name}</a></h3>
                    <p class="attraction-desc">${a.shortDesc}</p>
                    <div class="attraction-meta">
                        <span>⭐${a.rating}</span>
                        <div style="display:flex; gap:8px;">
                            <button class="btn-detail-sm" onclick="buyTicket('${a.name}')"><i class="fas fa-ticket-alt"></i> 购票</button>
                            <button class="btn-detail-sm" onclick="showModal('${a.id}')">详情</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}