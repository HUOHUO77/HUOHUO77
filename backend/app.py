from flask import Flask
from flask_cors import CORS
from models import db
from api.user import user_bp
from api.ai import ai_bp
from api.scenic import scenic_bp
from api.community import community_bp
from api.shop import shop_bp

app = Flask(__name__)
CORS(app)  # 解决跨域

# 数据库配置
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:密码@localhost:3306/guangyuan_travel'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'

db.init_app(app)

# 注册蓝图
app.register_blueprint(user_bp, url_prefix='/api/user')
app.register_blueprint(ai_bp, url_prefix='/api/ai')
app.register_blueprint(scenic_bp, url_prefix='/api/scenic')
app.register_blueprint(community_bp, url_prefix='/api/community')
app.register_blueprint(shop_bp, url_prefix='/api/shop')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # 自动建表
    app.run(debug=True, host='0.0.0.0', port=5000)
