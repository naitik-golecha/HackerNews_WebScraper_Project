CREATE DATABASE hackernews;

USE hackernews;

CREATE TABLE stories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    author VARCHAR(100),
    points INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
