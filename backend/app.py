from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "智慧广元旅游系统后端服务已启动"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
