from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# 用户表
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    avatar = db.Column(db.String(255), default='default.jpg')
    create_time = db.Column(db.DateTime, default=datetime.now)

# 景点表
class Scenic(db.Model):
    __tablename__ = 'scenic'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    cover = db.Column(db.String(255))
    desc = db.Column(db.Text)
    address = db.Column(db.String(255))
    price = db.Column(db.Float, default=0)

# 社区帖子
class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    title = db.Column(db.String(200))
    content = db.Column(db.Text)
    images = db.Column(db.Text)
    create_time = db.Column(db.DateTime, default=datetime.now)

# 商城商品
class Goods(db.Model):
    __tablename__ = 'goods'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    cover = db.Column(db.String(255))
    price = db.Column(db.Float)
    stock = db.Column(db.Integer, default=100)
