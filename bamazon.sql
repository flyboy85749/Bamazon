DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(6) NOT NULL,
  stock_quantity INT NOT NULL,
  	PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rocking Chair", "Home Goods", 100, 200), ("Tennis Racket", "Sporting Goods", 90, 100), ("Blanket", "Linens", 20, 50), ("Chocolate Bar", "Candy", 2, 1000), ("Ball Cap", "Sporting Goods", 5, 200), ("Nikon Camera", "Photography", 1000, 300), ("Laptop", "Computers", 800, 100), ("Tablet", "Computers", 200, 80), ("Angular, Javascript & Jquery", "Books", 30, 400), ("HTML & CSS", "Books", 20, 75);