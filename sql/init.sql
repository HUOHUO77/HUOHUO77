CREATE DATABASE IF NOT EXISTS guangyuan_travel;
USE guangyuan_travel;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(100),
    create_time DATETIME
);

CREATE TABLE scenery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    intro TEXT,
    address VARCHAR(255),
    price DECIMAL(10,2)
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    scenery_id INT,
    status INT,
    create_time DATETIME
);
