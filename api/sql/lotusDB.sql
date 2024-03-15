CREATE DATABASE lotus;

USE lotus;

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

CREATE TABLE materials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE urgency_level (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    departments_id INTEGER NOT NULL REFERENCES departments(id),
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE department_permissions (
    id SERIAL PRIMARY KEY,
    from_department_id INTEGER NOT NULL REFERENCES departments(id),
    to_department_id INTEGER NOT NULL REFERENCES departments(id),
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    department_id INTEGER NOT NULL REFERENCES departments(id),
    enterprise_id INTEGER NOT NULL REFERENCES enterprises(id),
    status_id INTEGER NOT NULL REFERENCES status(id),
    description TEXT NOT NULL,
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE requests_materials (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL REFERENCES requests(id),
    material_id INTEGER NOT NULL REFERENCES materials(id),
    urgency_level_id INTEGER NOT NULL REFERENCES urgency_level(id),
    status_id INTEGER NOT NULL REFERENCES status(id),
    quantity INTEGER NOT NULL,
    arrival_date TIMESTAMP,
    updated TIMESTAMP DEFAULT current_timestamp,
    created TIMESTAMP DEFAULT current_timestamp,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE status_history (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL REFERENCES requests(id),
    status_id INTEGER NOT NULL REFERENCES status(id),
    updated TIMESTAMP DEFAULT current_timestamp
);


