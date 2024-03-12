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

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE enterprises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    department_id INTEGER NOT NULL REFERENCES departments(id),
    enterprise_id INTEGER NOT NULL REFERENCES enterprises(id),
    urgency_level VARCHAR(255) NOT NULL,
    required_material TEXT NOT NULL,
    description TEXT NOT NULL,
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);


