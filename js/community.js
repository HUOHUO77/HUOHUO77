// ==================== 社区功能 ====================
// 当前用户数据
let currentUser = {
    nickname: "古道行者",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
};

// 帖子数据
let postsData = [
    { id: 1, author: "徒步阿峰", avatar: "https://randomuser.me/api/portraits/men/32.jpg", time: "2小时前", title: "剑门关鸟道实测，建议早上去", content: "今天刚走完鸟道，人少景美，猿猱道需要签安全协议，量力而行。", images: [], likes: 24, userLiked: false, comments: [{ author: "小李", text: "感谢分享！" }, { author: "阿峰", text: "不客气，加油！" }], tags: ["剑门关", "徒步"] },
    { id: 2, author: "吃货小敏", avatar: "https://randomuser.me/api/portraits/women/68.jpg", time: "昨天", title: "本地人推荐的女皇凉面", content: "明君凉面早上7点就开始排队，一定要加红油和蒜水！", images: [], likes: 56, userLiked: false, comments: [{ author: "食客", text: "改天去试试" }], tags: ["美食"] }
];
let nextPostId = 3;

// 保存帖子到本地存储
function savePostsToStorage() {
    localStorage.setItem("guangyuan_posts", JSON.stringify(postsData));
}

// 从本地存储加载帖子
function loadPostsFromStorage() {
    const stored = localStorage.getItem("guangyuan_posts");
    if (stored) {
        postsData = JSON.parse(stored);
        nextPostId = Math.max(...postsData.map(p => p.id), 0) + 1;
    }
}

// 保存用户资料
function saveUserProfile() {
    const newNick = document.getElementById("nicknameInput").value.trim();
    if (newNick) currentUser.nickname = newNick;
    const avatarFile = document.getElementById("avatarUpload").files[0];
    if (avatarFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentUser.avatar = e.target.result;
            localStorage.setItem("guangyuan_user", JSON.stringify(currentUser));
            document.getElementById("avatarPreview").src = currentUser.avatar;
            renderCommunity(document.getElementById("searchInput")?.value || "");
            showNotification("资料已保存");
            document.getElementById("profileModal").style.display = "none";
        };
        reader.readAsDataURL(avatarFile);
    } else {
        localStorage.setItem("guangyuan_user", JSON.stringify(currentUser));
        renderCommunity(document.getElementById("searchInput")?.value || "");
        showNotification("资料已保存");
        document.getElementById("profileModal").style.display = "none";
    }
}

// 加载用户资料
function loadUserFromStorage() {
    const saved = localStorage.getItem("guangyuan_user");
    if (saved) {
        currentUser = JSON.parse(saved);
    } else {
        localStorage.setItem("guangyuan_user", JSON.stringify(currentUser));
    }
    const avatarPreview = document.getElementById("avatarPreview");
    const nicknameInput = document.getElementById("nicknameInput");
    if (avatarPreview) avatarPreview.src = currentUser.avatar;
    if (nicknameInput) nicknameInput.value = currentUser.nickname;
}

// 添加评论
function addComment(postId, text) {
    const post = postsData.find(p => p.id == postId);
    if (post && text.trim()) {
        post.comments.push({ author: currentUser.nickname, text });
        savePostsToStorage();
        renderCommunity(document.getElementById("searchInput").value || "");
    }
}

// 点赞/取消点赞
function toggleLike(postId) {
    const post = postsData.find(p => p.id == postId);
    if (post) {
        post.likes += post.userLiked ? -1 : 1;
        post.userLiked = !post.userLiked;
        savePostsToStorage();
        renderCommunity(document.getElementById("searchInput").value || "");
    }
}

// 添加新帖
function addPost(title, content, imageBase64Array, tagsStr) {
    const tags = tagsStr.split(",").map(t => t.trim()).filter(t => t);
    const newPost = {
        id: nextPostId++,
        author: currentUser.nickname,
        avatar: currentUser.avatar,
        time: "刚刚",
        title,
        content,
        images: imageBase64Array,
        likes: 0,
        userLiked: false,
        comments: [],
        tags
    };
    postsData.unshift(newPost);
    savePostsToStorage();
    renderCommunity(document.getElementById("searchInput").value || "");
}

// 渲染社区
function renderCommunity(filterText = "") {
    const grid = document.getElementById('communityGrid');
    if (!grid) return;
    const filtered = postsData.filter(p => p.title.includes(filterText) || p.content.includes(filterText) || p.author.includes(filterText));
    grid.innerHTML = filtered.map(post => `
        <div class="post-card" data-id="${post.id}">
            <div class="post-header">
                <div class="post-avatar"><img src="${post.avatar}" onerror="this.src='https://randomuser.me/api/portraits/logo/1.jpg'"></div>
                <div class="post-meta">
                    <div class="post-author">${post.author}</div>
                    <div class="post-time">${post.time}</div>
                </div>
            </div>
            <div class="post-title">${post.title}</div>
            <div class="post-content">${post.content}</div>
            ${post.images.length ? `<div class="post-images">${post.images.map(img => `<img src="${img}" onclick="window.open('${img}')">`).join('')}</div>` : ''}
            <div class="post-stats">
                <span class="like-btn" data-id="${post.id}"><i class="far fa-heart ${post.userLiked ? 'liked' : ''}"></i> ${post.likes}</span>
                <span class="comment-toggle-btn" data-id="${post.id}"><i class="far fa-comment"></i> ${post.comments.length}条评论</span>
                <span class="share-btn" data-id="${post.id}"><i class="far fa-share-square"></i> 分享</span>
            </div>
            <div class="comment-section">
                <button class="comment-toggle-btn" data-id="${post.id}" style="background:none; border:none; color:var(--accent-warm); cursor:pointer; margin-bottom:8px;">展开评论</button>
                <div class="comment-list" id="commentList-${post.id}" style="display:none;">
                    ${post.comments.map(c => `<div class="comment-item"><span class="comment-author">${c.author}</span><span class="comment-text">${c.text}</span></div>`).join('')}
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="写评论..." id="commentInput-${post.id}">
                    <button onclick="addComment(${post.id}, document.getElementById('commentInput-${post.id}').value)">发送</button>
                </div>
            </div>
            <div class="post-tags">
                ${post.tags.map(t => `<span class="post-tag">${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
    attachCommunityEvents();
}

// 绑定社区事件
function attachCommunityEvents() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLike(parseInt(btn.dataset.id));
        });
    });
    document.querySelectorAll('.comment-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const list = document.getElementById(`commentList-${btn.dataset.id}`);
            if (list) list.style.display = list.style.display === 'none' ? 'block' : 'none';
        });
    });
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert("分享链接（演示）");
        });
    });
}