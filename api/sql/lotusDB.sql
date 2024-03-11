CREATE DATABASE lotus;

USE lotus;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);


