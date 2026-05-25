// ==================== 高德地图功能 ====================
let amapInstance = null;
let amapMarkers = [];
let currentMapType = 'normal';

// 等待地图加载
function waitForAmap(callback) {
    if (typeof AMap !== 'undefined' && AMap.Map) callback();
    else if (window.AMapLoaded) callback();
    else window.AMAP_LOAD_CALLBACKS.push(callback);
}

// 初始化智慧导览地图
function initSmartMap() {
    waitForAmap(() => {
        if (typeof AMap === 'undefined') return;
        try {
            if (amapInstance) amapInstance.destroy();
            amapInstance = new AMap.Map('smartMapContainer', {
                zoom: 10,
                center: MAP_CENTER,
                viewMode: '2D',
                mapStyle: 'amap://styles/dark',
                resizeEnable: true
            });
            try {
                amapInstance.addControl(new AMap.Scale({ position: 'LB' }));
                amapInstance.addControl(new AMap.ToolBar({ position: 'RB', liteStyle: true }));
            } catch(e) {}
            addAttractionMarkers();
            loadRealWeather();
            showApiStatus('高德地图已连接', true);
        } catch (e) {
            console.error('地图初始化失败:', e);
        }
    });
}

// 添加景点标记
function addAttractionMarkers() {
    if (!amapInstance) return;
    amapMarkers.forEach(m => m.setMap(null));
    amapMarkers = [];
    
    allAttractions.forEach(attr => {
        if (!attr.lnglat) return;
        const marker = new AMap.Marker({
            position: attr.lnglat,
            title: attr.name,
            extData: attr
        });
        const infoWindow = new AMap.InfoWindow({
            content: `<div style="padding:10px;">
                <h4 style="color:#1a2c1e;">${attr.name}</h4>
                <p>${attr.shortDesc}</p>
                <p>${attr.price}</p>
                <button onclick="navigateTo('${attr.name}', ${attr.lnglat[0]}, ${attr.lnglat[1]})" style="background:#c9a962;border:none;padding:5px 12px;border-radius:20px;cursor:pointer;margin-top:8px;margin-right:8px;">导航</button>
                <button onclick="buyTicket('${attr.name}')" style="background:#c9a962;border:none;padding:5px 12px;border-radius:20px;cursor:pointer;margin-top:8px;">购票</button>
            </div>`,
            offset: new AMap.Pixel(0, -30)
        });
        marker.on('click', () => {
            infoWindow.open(amapInstance, marker.getPosition());
            updateMapInfoPanel(attr);
        });
        marker.setMap(amapInstance);
        amapMarkers.push(marker);
    });
    if (amapMarkers.length) amapInstance.setFitView(amapMarkers, false, [60, 60, 60, 60]);
}

// 导航到景点
function navigateTo(name, lng, lat) {
    const url = `https://uri.amap.com/navigation?to=${lng},${lat},${encodeURIComponent(name)}&mode=car&policy=1`;
    window.open(url, '_blank');
    showNotification(`正在打开高德地图，导航至「${name}」`);
}

// 购票（跳转美团）
function buyTicket(attractionName) {
    const searchUrl = `https://www.meituan.com/s/${encodeURIComponent(attractionName)}`;
    window.open(searchUrl, '_blank');
    showNotification(`正在打开美团，搜索「${attractionName}」门票`);
}

// 加载实时天气
function loadRealWeather() {
    fetch('https://wttr.in/guangyuan?format=%t+%C&lang=zh')
        .then(response => response.text())
        .then(data => {
            const match = data.match(/([+-]?\d+)°C?\s+(.+)/);
            if (match) {
                let temp = match[1].replace('+', '');
                let weather = match[2];
                updateWeatherWidget(temp, weather, '65');
            } else {
                updateWeatherWidget('22', '多云', '65');
            }
        })
        .catch(error => { updateWeatherWidget('22', '多云', '65'); });
}

// 更新天气显示
function updateWeatherWidget(temp, weather, humidity) {
    const widget = document.getElementById('weatherWidget');
    if (widget) {
        let icon = '<i class="fas fa-sun"></i>';
        if (weather && (weather.includes('云') || weather.includes('阴'))) icon = '<i class="fas fa-cloud-sun"></i>';
        else if (weather && (weather.includes('雨') || weather.includes('雪'))) icon = '<i class="fas fa-cloud-rain"></i>';
        else if (weather && weather.includes('雾')) icon = '<i class="fas fa-smog"></i>';
        widget.innerHTML = `${icon}<div class="weather-info"><div class="weather-temp">${temp}°C</div><div>${weather || '多云'} | 湿度${humidity || '65'}%</div></div>`;
    }
}

// 更新地图信息面板
function updateMapInfoPanel(attr) {
    const panel = document.getElementById('mapInfoPanel');
    if (panel) {
        panel.innerHTML = `
            <h4><i class="fas fa-map-pin"></i> ${attr.name}</h4>
            <p>${attr.fullDesc}</p>
            <p><strong>开放时间：</strong>${attr.hours}</p>
            <p><strong>门票：</strong>${attr.price}</p>
            <p><strong>交通：</strong>${attr.traffic}</p>
            <div style="margin-top:10px;">
                <button onclick="navigateTo('${attr.name}', ${attr.lnglat[0]}, ${attr.lnglat[1]})" style="background:var(--accent-gold);border:none;padding:8px 16px;border-radius:20px;cursor:pointer;"><i class="fas fa-directions"></i> 导航</button>
                <button onclick="buyTicket('${attr.name}')" style="background:var(--accent-gold);border:none;padding:8px 16px;border-radius:20px;cursor:pointer;"><i class="fas fa-ticket-alt"></i> 购票</button>
                <button onclick="showModal('${attr.id}')" style="background:rgba(201,169,98,0.2);border:1px solid var(--accent-gold);padding:8px 16px;border-radius:20px;cursor:pointer;">攻略</button>
            </div>
        `;
    }
}

// 重置地图视图
function resetMapView() {
    if (amapInstance) amapInstance.setZoomAndCenter(10, MAP_CENTER);
    else showNotification('地图未初始化');
}

// 切换地图类型（普通/卫星）
function toggleMapType() {
    if (!amapInstance) return;
    currentMapType = currentMapType === 'normal' ? 'satellite' : 'normal';
    amapInstance.setMapStyle(currentMapType === 'satellite' ? 'amap://styles/satellite' : 'amap://styles/dark');
    showNotification(currentMapType === 'satellite' ? '卫星视图' : '标准视图');
}

// 定位我的位置
function locateMe() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            if (amapInstance) amapInstance.setCenter([pos.coords.longitude, pos.coords.latitude]);
        }, () => alert('定位失败'));
    } else {
        alert('浏览器不支持定位');
    }
}

// 渲染地图页的景点列表
function renderMapAttractionsList() {
    const grid = document.getElementById('mapAttractionsList');
    if (grid) {
        grid.innerHTML = allAttractions.filter(a => a.lnglat).map(a => `
            <div class="attraction-card">
                <img class="attraction-img" src="${a.img}" style="height:160px;">
                <div class="attraction-content">
                    <h3>${a.name}</h3>
                    <p>${a.shortDesc}</p>
                    <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
                        <button class="btn-detail-sm" onclick="navigateTo('${a.name}', ${a.lnglat[0]}, ${a.lnglat[1]})"><i class="fas fa-directions"></i> 导航</button>
                        <button class="btn-detail-sm" onclick="buyTicket('${a.name}')"><i class="fas fa-ticket-alt"></i> 购票</button>
                        <button class="btn-detail-sm" onclick="showModal('${a.id}')">详情</button>
                    </div>
                    <span class="crowd-indicator crowd-${a.crowd}">${a.crowd == 'high' ? '拥挤' : (a.crowd == 'medium' ? '适中' : '舒适')}</span>
                </div>
            </div>
        `).join('');
    }
}