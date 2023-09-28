
CREATE DATABASE IF NOT EXISTS mydb;


USE mydb;


CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerName VARCHAR(255) NOT NULL,
  orderAmount DECIMAL(10, 2) NOT NULL,
  orderNumber INT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  materials JSON NOT NULL
);

-- Create a table for materials
CREATE TABLE materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId INT NOT NULL,
  materialNumber VARCHAR(255) NOT NULL,
  orderAmount DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (orderId) REFERENCES orders(id)
);
