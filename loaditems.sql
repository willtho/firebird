CREATE TABLE inventory (id INTEGER PRIMARY KEY AUTOINCREMENT, name unique, category integer, quantity integer, price real, salePrice real, description text);
CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname text, lastname text, username unique, password text, email text, admin boolean);
CREATE TABLE categories (id INTEGER PRIMARY KEY AUTOINCREMENT, category text);
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem1', 1, 7, 1.8, 1.7, 'This is the first item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem2', 2, 7, 1.9, 1.9, 'This is the second item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem3', 1, 7, 1.12, 1.12, 'This is the third item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem4', 3, 7, 1.45, 1.3, 'This is the fourth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem5', 3, 7, 1.56, 1.56, 'This is the fifth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem6', 2, 7, 2.8, 1.45, 'This is the sixth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem7', 1, 7, 4.8, 4.8, 'This is the seventh item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem8', 3, 7, 1.8, 1.7, 'This is the eighth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem9', 2, 7, 1.9, 1.9, 'This is the ninth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem10', 1, 7, 1.12, 1.12, 'This is the tenth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem11', 2, 7, 1.45, 1.45, 'This is the eleventh item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem12', 3, 7, 1.56, 1.3, 'This is the twelfth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem13', 3, 7, 2.8, 1.45, 'This is the thirteenth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem14', 1, 7, 4.8, 4.8, 'This is the fourteenth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem15', 3, 7, 1.8, 1.8, 'This is the fifteenth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem16', 2, 7, 1.9, 1.3, 'This is the sixteenth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem17', 1, 7, 1.12, 1.12, 'This is the seventeenth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem18', 2, 7, 1.45, 1.45, 'This is the eighteenth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem19', 1, 7, 1.56, 1.56, 'This is the ninteenth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem20', 3, 7, 2.8, 1.45, 'This is the twentieth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem21', 1, 7, 4.8, 4.8, 'This is the twentyfirst item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem22', 3, 7, 1.8, 1.7, 'This is the twentysecond item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem23', 3, 7, 1.9, 1.3, 'This is the twentythird item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem24', 1, 7, 1.12, 1.12, 'This is the twentyfourth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem25', 2, 7, 1.45, 1.45, 'This is the twentyfifth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem26', 3, 7, 1.56, 1.56, 'This is the twentysixth item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem27', 2, 7, 2.8, 2.8, 'This is the twentyseventh item');
INSERT INTO inventory(name, category, quantity, price, salePrice, description) VALUES('testitem28', 1, 7, 4.8, 3.2, 'This is the twentyeighth item');
INSERT INTO categories(category) VALUES ('test1');
INSERT INTO categories(category) VALUES ('test2');
INSERT INTO categories(category) VALUES ('test3');
INSERT INTO users(firstname, lastname, username, password, email, admin) VALUES('John', 'Doe', 'johndoe', 'mypassword', 'johndoe@example.com', 1);
