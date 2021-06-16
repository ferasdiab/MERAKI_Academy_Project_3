CREATE DATABASE MERAKI_Academy_Project_3;
USE MERAKI_Academy_Project_3;

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE users(
    user_id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT(3),
    country VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (user_id)
);

CREATE TABLE articles (
    article_id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(255),
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES users(user_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (article_id)
);

CREATE TABLE comments(
    comment_id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    article_id INT,
    FOREIGN KEY (article_id) REFERENCES articles(article_id),
    commenter_id INT,
    FOREIGN KEY (commenter_id) REFERENCES users(user_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (comment_id)
);


SELECT * FROM users
  INNER JOIN roles ON users.role_id = roles.role_id  ;


  SELECT * FROM articles
  INNER JOIN users ON articles.author_id = users.user_id;

   select * from comments
   INNER JOIN users ON comments.commenter_id= users.user_id;
