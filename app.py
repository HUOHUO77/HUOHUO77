from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
import time

# 初始化 Flask 应用
app = Flask(__name__)
CORS(app)  # 允许跨域，前端可直接调用
app.config['JSON_AS_ASCII'] = False

# 1. 首页数据
@app.route('/api/home', methods=['GET'])
def api_home():
    data = {
        "title": "蜀道广元智慧旅游系统",
        "overview": {
            "history": "2300+ 年建城史",
            "5a_scenic": "剑门关景区",
            "forest_rate": "57.6%",
            "feature": "女皇诞生地"
        },
        "modules": ["蜀道揽胜", "智慧导览", "问答社区", "女皇御礼", "AI助手"]
    }
    return jsonify({"code": 200, "data": data, "msg": "success"})

# 2. 景点列表（和你前端 allAttractions 完全一致）
@app.route('/api/attractions', methods=['GET'])
def api_attractions():
    attractions = [
        {
            "id": "jmc", "name": "剑门关",
            "shortDesc": "一夫当关，万夫莫开",
            "fullDesc": "国家5A级景区，三国文化核心，鸟道猿猱道极限挑战",
            "hours": "08:00-17:30", "price": "¥105",
            "rating": "4.7", "tag": "5A景区",
            "lnglat": [105.557, 32.217], "crowd": "high"
        },
        {
            "id": "cst", "name": "翠云廊",
            "shortDesc": "蜀道明珠",
            "fullDesc": "古柏参天，张飞植柏，徒步如穿越时光",
            "hours": "08:30-18:00", "price": "¥40",
            "rating": "4.8", "tag": "古柏",
            "lnglat": [105.534, 32.245], "crowd": "medium"
        },
        {
            "id": "hzs", "name": "皇泽寺",
            "shortDesc": "唯一女皇祀庙",
            "fullDesc": "武则天祀庙，保存国内唯一武则天真容石刻像",
            "hours": "08:30-17:30", "price": "¥50",
            "rating": "4.2", "tag": "文保",
            "lnglat": [105.839, 32.441], "crowd": "low"
        }
    ]
    return jsonify({"code": 200, "data": attractions, "msg": "success"})

# 3. 特产商城数据
@app.route('/api/products', methods=['GET'])
def api_products():
    products = [
        {"name": "苍溪红心猕猴桃礼盒", "price": "¥68", "cat": "gift"},
        {"name": "剑门豆腐干组合", "price": "¥38", "cat": "tofu"},
        {"name": "青川黑木耳", "price": "¥28", "cat": "special"},
        {"name": "广元蒸凉面", "price": "¥8", "cat": "gift"},
    ]
    return jsonify({"code": 200, "data": products, "msg": "success"})

# 4. 社区帖子列表
@app.route('/api/posts', methods=['GET'])
def api_posts():
    posts = [
        {
            "id": 1, "author": "徒步阿峰", "time": "2小时前",
            "title": "剑门关鸟道实测，建议早上去",
            "content": "今天刚走完鸟道，人少景美，猿猱道需要签安全协议",
            "likes": 24, "comments": 2
        },
        {
            "id": 2, "author": "吃货小敏", "time": "昨天",
            "title": "本地人推荐的女皇凉面",
            "content": "明君凉面早上7点开始排队，一定要加红油和蒜水",
            "likes": 56, "comments": 1
        }
    ]
    return jsonify({"code": 200, "data": posts, "msg": "success"})

# 5. AI问答本地兜底
@app.route('/api/ai/chat', methods=['POST'])
def api_ai_chat():
    question = request.json.get("question", "")
    q = question.lower()

    if "门票" in q and "剑门关" in q:
        ans = "剑门关门票：105元，开放时间08:00-17:30"
    elif "美食" in q:
        ans = "推荐：女皇蒸凉面、剑门豆腐宴、核桃饼"
    elif "翠云廊" in q:
        ans = "翠云廊有7000多棵古柏，徒步约7公里"
    elif "皇泽寺" in q:
        ans = "皇泽寺是武则天祀庙，门票50元"
    else:
        ans = "我是蜀道智慧助手，可解答广元景点、美食、路线、天气等问题~"

    return jsonify({
        "code": 200,
        "data": {"answer": ans},
        "msg": "success"
    })

# 6. 天气数据
@app.route('/api/weather', methods=['GET'])
def api_weather():
    weather = {
        "temp": "22",
        "weather": "多云",
        "humidity": "65"
    }
    return jsonify({"code": 200, "data": weather, "msg": "success"})

def index():
    return send_from_directory(os.getcwd(), "index.html")

# 静态资源（CSS/JS）
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(os.getcwd(), filename)

if __name__ == '__main__':
    print("=" * 60)
    print(" 蜀道广元智慧旅游系统 后端服务已启动 ")
    print(" 访问：http://127.0.0.1:5000")
    print("=" * 60)
    app.run(host="0.0.0.0", port=5000, debug=True)
