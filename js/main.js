// ==================== 主入口 ====================
// 页面切换
function showPage(pageName) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    
    if (pageName === 'attractions') {
        renderAttractions();
        buildCarousel();
    }
    if (pageName === 'community') {
        renderCommunity(document.getElementById("searchInput")?.value || "");
    }
    if (pageName === 'shop') {
        initShop();
    }
    if (pageName === 'smartmap') {
        setTimeout(() => initSmartMap(), 100);
        renderMapAttractionsList();
    }
    
    document.getElementById(`page-${pageName}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 导入行程到地图
function importPlanToMap(planKey) {
    const plan = planData[planKey];
    if (!plan || !plan.mapRoute) return;
    showPage('smartmap');
    setTimeout(() => {
        if (amapInstance && amapMarkers.length > 0) {
            const routeMarkers = amapMarkers.filter(m => {
                const data = m.getExtData();
                return data && plan.mapRoute.includes(data.id);
            });
            if (routeMarkers.length > 0) {
                amapInstance.setFitView(routeMarkers, false, [80, 80, 80, 80]);
                showNotification(`已加载${plan.title}路线，共${routeMarkers.length}个景点`);
            }
        } else {
            initSmartMap();
            setTimeout(() => {
                if (amapInstance && amapMarkers.length > 0) {
                    const routeMarkers = amapMarkers.filter(m => {
                        const data = m.getExtData();
                        return data && plan.mapRoute.includes(data.id);
                    });
                    if (routeMarkers.length > 0) {
                        amapInstance.setFitView(routeMarkers, false, [80, 80, 80, 80]);
                        showNotification(`已加载${plan.title}路线，共${routeMarkers.length}个景点`);
                    }
                } else {
                    showNotification('地图加载中，请稍后再试');
                }
            }, 1000);
        }
    }, 800);
}

// 初始化首页的徒步路线和行程规划按钮
function initHomePage() {
    // 徒步路线
    const trailGrid = document.getElementById('trailGrid');
    if (trailGrid) {
        trailGrid.innerHTML = `
            <div class="trail-card"><img class="trail-img" src="https://p2.ssl.qhimgsl.com/sdr/400_/t04574786f2523e9a08.jpg"><div class="trail-content"><h3>剑门关·鸟道</h3><p>极限挑战</p></div></div>
            <div class="trail-card"><img class="trail-img" src="https://p2.ssl.qhimgsl.com/sdr/400_/t045a05273a0fae784c.jpg"><div class="trail-content"><h3>翠云廊</h3><p>古柏徒步</p></div></div>
            <div class="trail-card"><img class="trail-img" src="https://p0.ssl.qhimgsl.com/sdr/400_/t045c855355aadccf00.jpg"><div class="trail-content"><h3>明月峡栈道</h3><p>文化徒步</p></div></div>
        `;
    }
    
    // 行程规划按钮
    const planBtns = document.getElementById('planBtns');
    if (planBtns) {
        planBtns.innerHTML = `
            <button class="plan-btn" data-plan="weekend">周末游</button>
            <button class="plan-btn" data-plan="holiday">小长假</button>
            <button class="plan-btn" data-plan="deep">深度游</button>
        `;
        document.querySelectorAll('.plan-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.plan-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const plan = planData[this.dataset.plan];
                if (plan) {
                    document.getElementById('planResult').innerHTML = `
                        <div style="padding:1.5rem;">
                            <h3 style="color:var(--accent-gold); margin-bottom:1rem;">${plan.title}</h3>
                            ${plan.days.map(d => `
                                <div style="background:rgba(255,255,250,0.03); border-radius:16px; padding:1rem; margin-bottom:1rem; border-left:3px solid var(--accent-gold);">
                                    <div style="font-weight:700; color:var(--accent-warm); margin-bottom:0.5rem;">${d.day}</div>
                                    <div style="font-size:0.9rem; margin-bottom:0.3rem;"><i class="fas fa-sun" style="color:#f1c40f;"></i> 上午：${d.am}</div>
                                    <div style="font-size:0.9rem; margin-bottom:0.3rem;"><i class="fas fa-moon" style="color:#9b59b6;"></i> 下午：${d.pm}</div>
                                    <div style="font-size:0.8rem; color:var(--accent-gold); margin-top:0.5rem;"><i class="fas fa-lightbulb"></i> ${d.tip}</div>
                                </div>
                            `).join('')}
                            <div style="text-align:center; margin-top:1.5rem;">
                                <button class="btn-detail-sm" onclick="importPlanToMap('${this.dataset.plan}')" style="font-size:0.9rem; padding:0.5rem 1.5rem;">
                                    <i class="fas fa-map-marked-alt"></i> 在地图中查看此路线
                                </button>
                            </div>
                        </div>
                    `;
                }
            });
        });
    }
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 加载存储的数据
    loadUserFromStorage();
    loadPostsFromStorage();
    
    // 初始化各模块
    renderAttractions();
    renderCommunity();
    initShop();
    buildCarousel();
    initHomePage();
    
    // 绑定事件
    document.getElementById('carouselPrev')?.addEventListener('click', prevSlide);
    document.getElementById('carouselNext')?.addEventListener('click', nextSlide);
    document.getElementById('searchInput')?.addEventListener('input', (e) => renderCommunity(e.target.value));
    document.getElementById('createPostBtn')?.addEventListener('click', () => document.getElementById('newPostModal').style.display = 'flex');
    document.getElementById('closePostModalBtn')?.addEventListener('click', () => document.getElementById('newPostModal').style.display = 'none');
    document.getElementById('profileSettingBtn')?.addEventListener('click', () => document.getElementById('profileModal').style.display = 'flex');
    document.getElementById('saveProfileBtn')?.addEventListener('click', saveUserProfile);
    document.getElementById('closeProfileBtn')?.addEventListener('click', () => document.getElementById('profileModal').style.display = 'none');
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => document.getElementById('mobileNavOverlay').classList.toggle('active'));
    document.querySelectorAll('.mobile-nav-overlay a').forEach(a => a.addEventListener('click', closeMobile));
    document.getElementById('backToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.getElementById('aiFabBtn')?.addEventListener('click', openAIDialog);
    document.getElementById('aiDialogClose')?.addEventListener('click', () => document.getElementById('aiDialog').classList.remove('show'));
    document.getElementById('aiSendBtn')?.addEventListener('click', askDeepSeek);
    document.getElementById('modalClose')?.addEventListener('click', () => {
        document.getElementById('attractionModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('attractionModal')) {
            document.getElementById('attractionModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('backToTop');
        if (window.scrollY > 300) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });
    
    // 新帖图片上传预览
    let pendingImages = [];
    document.getElementById('postImageUpload')?.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        pendingImages = [];
        const container = document.getElementById('imagePreviewContainer');
        container.innerHTML = '';
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(ev) {
                pendingImages.push(ev.target.result);
                const img = document.createElement('img');
                img.src = ev.target.result;
                container.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });
    document.getElementById('submitPostBtn')?.addEventListener('click', () => {
        const title = document.getElementById('postTitleInput').value;
        const content = document.getElementById('postContentInput').value;
        const tags = document.getElementById('postTagsInput').value;
        if (!title || !content) {
            alert("请填写标题和内容");
            return;
        }
        addPost(title, content, pendingImages, tags);
        document.getElementById('newPostModal').style.display = 'none';
        document.getElementById('postTitleInput').value = '';
        document.getElementById('postContentInput').value = '';
        document.getElementById('postTagsInput').value = '';
        document.getElementById('imagePreviewContainer').innerHTML = '';
        pendingImages = [];
    });
});

// 导出全局函数供 HTML 调用
window.showPage = showPage;
window.showModal = showModal;
window.flyToMap = flyToMap;
window.resetMapView = resetMapView;
window.toggleMapType = toggleMapType;
window.locateMe = locateMe;
window.importPlanToMap = importPlanToMap;
window.openAIDialog = openAIDialog;
window.askDeepSeek = askDeepSeek;
window.toggleAccessibility = toggleAccessibility;
window.closeMobile = closeMobile;
window.addComment = addComment;
window.showNotification = showNotification;
window.navigateTo = navigateTo;
window.buyTicket = buyTicket;