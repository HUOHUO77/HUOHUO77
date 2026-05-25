// ==================== 配置常量 ====================
// 注意：请勿在生产环境中将 API Key 直接暴露在前端！
// 建议通过后端代理调用 AI 接口

// DeepSeek AI 配置（建议移至后端）
export const DEEPSEEK_API_KEY = 'YOUR_DEEPSEEK_API_KEY';  // 请替换为你的真实 Key
export const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
export const DEEPSEEK_SYSTEM_PROMPT = `你是一个专业的广元旅游助手，名叫"蜀道智慧助手"。热情、耐心地回答用户关于广元旅游的所有问题。`;

// 景点数据
export const allAttractions = [
    { id: "jmc", name: "剑门关", img: "https://p0.ssl.qhimgsl.com/sdr/400_/t01a3b9fef6c17e48c6.jpg", shortDesc: "一夫当关，万夫莫开", fullDesc: "国家5A级景区，三国文化核心，鸟道猿猱道极限挑战。", hours: "08:00-17:30", price: "¥105", traffic: "高铁剑门关站换乘7路", rating: "4.7", tag: "5A景区", link: "https://baike.baidu.com/item/%E5%89%91%E9%97%A8%E5%85%B3", lnglat: [105.557, 32.217], crowd: "high" },
    { id: "cst", name: "翠云廊", img: "https://p2.ssl.qhimgsl.com/sdr/400_/t045a05273a0fae784c.jpg", shortDesc: "蜀道明珠", fullDesc: "古柏参天，张飞植柏，徒步如穿越时光。", hours: "08:30-18:00", price: "¥40", traffic: "剑门关换乘", rating: "4.8", tag: "古柏", link: "https://baike.baidu.com/item/%E7%BF%A0%E4%BA%91%E5%BB%8A", lnglat: [105.534, 32.245], crowd: "medium" },
    { id: "hzs", name: "皇泽寺", img: "https://p1.ssl.qhimgsl.com/sdr/400_/t04484b560d3c920417.jpg", shortDesc: "唯一女皇祀庙", fullDesc: "武则天祀庙，保存国内唯一武则天真容石刻像。", hours: "08:30-17:30", price: "¥50", traffic: "市区15路公交", rating: "4.2", tag: "文保", link: "https://baike.baidu.com/item/%E7%9A%87%E6%B3%BD%E5%AF%BA", lnglat: [105.839, 32.441], crowd: "low" },
    { id: "myx", name: "明月峡", img: "https://p0.ssl.qhimgsl.com/sdr/400_/t045c855355aadccf00.jpg", shortDesc: "交通历史博物馆", fullDesc: "先秦古栈道遗址，集六道合一。", hours: "08:30-17:00", price: "¥70", traffic: "北门汽车站", rating: "4.5", tag: "古栈道", link: "https://baike.baidu.com/item/%E6%98%8E%E6%9C%88%E5%B3%A1", lnglat: [105.962, 32.648], crowd: "medium" },
    { id: "qfs", name: "千佛崖", img: "https://p2.ssl.qhimgsl.com/sdr/400_/t0454a6afbf26f1e9c2.jpg", shortDesc: "石刻艺术宝库", fullDesc: "四川规模最大石窟群，始凿北魏。", hours: "09:00-17:30", price: "¥50", traffic: "5路/7路", rating: "4.3", tag: "石窟", link: "https://baike.baidu.com/item/%E5%8D%83%E4%BD%9B%E5%B4%96", lnglat: [105.847, 32.438], crowd: "low" },
    { id: "zhgc", name: "昭化古城", img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.U19s6H1XRV_qb5c91C9DwHaE8?w=264&h=197&c=7&r=0&o=7&cb=thfc1&dpr=1.3&pid=1.7&rm=3", shortDesc: "巴蜀第一县", fullDesc: "三国古城，保存完好明清建筑群。", hours: "全天", price: "免费(联票¥52)", traffic: "南河汽车站", rating: "4.6", tag: "古城", link: "https://baike.baidu.com/item/%E6%98%AD%E5%8C%96%E5%8F%A4%E5%9F%8E", lnglat: [105.713, 32.323], crowd: "medium" },
    { id: "zjs", name: "曾家山", img: "https://p2.ssl.qhimgsl.com/t01a29a5c72a6d6630c.jpg", shortDesc: "避暑胜地", fullDesc: "海拔1400米，夏季均温23℃，溶洞石林。", hours: "08:30-17:30", price: "¥65", traffic: "旅游巴士", rating: "4.5", tag: "避暑", link: "https://baike.baidu.com/item/%E6%9B%BE%E5%AE%B6%E5%B1%B1", lnglat: [106.042, 32.656], crowd: "low" }
];

// 地图中心点（广元市区）
export const MAP_CENTER = [105.830, 32.435];

// 轮播图数据
export const carouselData = [
    { bg: "https://p2.ssl.qhimgs1.com/sdr/400__/t01d8d82ffbeb156b2c.jpg", title: "欢迎来到广元市", subtitle: "女皇故里 · 剑门蜀道", desc: "广元是先秦古栈道文化和蜀道文化的集中展现地。" },
    { bg: "https://p2.ssl.qhimgs1.com/sdr/400__/t01291314bcca4c0c0c.jpg", title: "广元美食", subtitle: "舌尖上的女皇故里", desc: "剑门豆腐、女皇蒸凉面，每一道都有故事。" },
    { bg: "https://p0.ssl.qhimgs1.com/sdr/400__/t01bc9612229d9b7bde.jpg", title: "女皇武则天", subtitle: "唯一女皇 · 诞生之地", desc: "皇泽寺是中国唯一的女皇帝祀庙。" },
    { bg: "https://p0.ssl.qhimgs1.com/sdr/400__/t045c855355aadccf00.jpg", title: "古蜀道文化", subtitle: "千年栈道 · 交通博物馆", desc: "明月峡古栈道、金牛道，中华文明交流通道。" },
    { bg: "https://p2.ssl.qhimgs1.com/sdr/400__/t0138182388a40cd622.jpg", title: "剑门天下险", subtitle: "一夫当关 · 万夫莫开", desc: "三国时期诸葛亮在此设关戍守。" }
];

// 行程规划数据
export const planData = {
    weekend: { title: "周末两日游", days: [{ day: "第一天", am: "剑门关景区（鸟道/猿猱道）", pm: "翠云廊古柏徒步", tip: "建议早8点前入园避峰" }, { day: "第二天", am: "皇泽寺（女皇文化）", pm: "千佛崖石刻+市区美食", tip: "晚上品尝明君凉面" }], mapRoute: ["jmc", "cst", "hzs", "qfs"] },
    holiday: { title: "小长假三日游", days: [{ day: "第一天", am: "明月峡古栈道", pm: "昭化古城夜游", tip: "古城夜景绝佳" }, { day: "第二天", am: "剑门关全天深度游", pm: "温泉酒店休息", tip: "鸟道需预约" }, { day: "第三天", am: "曾家山避暑", pm: "返程", tip: "夏季均温23℃" }], mapRoute: ["myx", "zhgc", "jmc", "zjs"] },
    deep: { title: "深度五日游", days: [{ day: "第一天", am: "皇泽寺+千佛崖", pm: "市区文化游", tip: "了解女皇故里历史" }, { day: "第二天", am: "明月峡", pm: "古栈道遗址探索", tip: "穿舒适运动鞋" }, { day: "第三天", am: "剑门关", pm: "翠云廊", tip: "全程约8公里" }, { day: "第四天", am: "曾家山", pm: "溶洞探险", tip: "带薄外套" }, { day: "第五天", am: "昭化古城", pm: "返程", tip: "购买剑门豆腐干特产" }], mapRoute: ["hzs", "qfs", "myx", "jmc", "cst", "zjs", "zhgc"] }
};