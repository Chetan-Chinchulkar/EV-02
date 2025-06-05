CREATE DATABASE IF NOT EXISTS phonebook;
USE phonebook;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS secrets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    secret_key VARCHAR(100),
    secret_value VARCHAR(100)
);

INSERT INTO contacts (name, phone) VALUES
    ('John Doe', '555-0100'),
    ('Jane Smith', '555-0101'),
    ('Bob Johnson', '555-0102'),
    ('Alice Brown', '555-0103');
