CREATE TYPE gender AS ENUM ('Male', 'Female');
CREATE DATABASE db_tugas;

CREATE TABLE login(
    login_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
    gender gender,
    phone_number VARCHAR(20)
);