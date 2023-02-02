CREATE TABLE IF NOT EXISTS user (
    ID INT(5) AUTO_INCREMENT PRIMARY KEY,
    mail VARCHAR(30),
    userName VARCHAR(20),
    name VARCHAR(30),
    surnames VARCHAR(40),
    password VARCHAR(18),
    photo TEXT,
    role VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS post (
    ID INT(5) AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(500),
    postDate DATE,
    likes INT(9)
);

CREATE TABLE IF NOT EXISTS comment (
    ID INT(5) AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(100),
    commDate DATE,
    likes INT(9)   
);

CREATE TABLE IF NOT EXISTS postCommentUserRelation (
    PCURelationID INT(5) AUTO_INCREMENT PRIMARY KEY,
    user INT(5),
    post INT(5),
    comment INT(5),
    FOREIGN KEY (user) REFERENCES user (ID),
    FOREIGN KEY (post) REFERENCES post (ID),
    FOREIGN KEY (comment) REFERENCES comment (ID)
);

CREATE TABLE IF NOT EXISTS multimedia (
    ID INT(5) AUTO_INCREMENT PRIMARY KEY, 
    path TEXT
);

CREATE TABLE IF NOT EXISTS postMultimediaRelation (
    PMRelationID INT(5) AUTO_INCREMENT PRIMARY KEY,
    post INT(5),
    multimedia INT(5),
    FOREIGN KEY (post) REFERENCES post(ID),
    FOREIGN KEY (multimedia) REFERENCES multimedia (ID)
);

CREATE TABLE IF NOT EXISTS friendship (
    friendshipID INT(5) AUTO_INCREMENT PRIMARY KEY,
    userOneID INT(5),
    userTwoID INT(5),
    FOREIGN KEY (userOneID) REFERENCES user (ID),
    FOREIGN KEY (userTwoID) REFERENCES user (ID)
);

CREATE TABLE IF NOT EXISTS conver (
    ID INT(5) AUTO_INCREMENT PRIMARY KEY,
    conversation LONGTEXT,
    userOneID INT(5),
    userTwoID INT(5),
    FOREIGN KEY (userOneID) REFERENCES user (ID),
    FOREIGN KEY (userTwoID) REFERENCES user (ID)
);

CREATE TABLE IF NOT EXISTS message (
    ID INT(5) AUTO_INCREMENT PRIMARY KEY, 
    content LONGTEXT,
    msgDate DATE,
    user INT(5),
    conver INT(5),
    FOREIGN KEY (user) REFERENCES user (ID),
    FOREIGN KEY (conver) REFERENCES conver (ID)
);