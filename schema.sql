CREATE DATABASE articles_info;
USE articles_info;

CREATE TABLE Article_categories (
    category_id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description TEXT,
    parent_id int
);

CREATE TABLE Articles (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description TEXT,
    category_id int,
    FOREIGN KEY (category_id) REFERENCES Article_categories(category_id)
);

INSERT INTO Article_categories(name, description, parent_id)
VALUES
('Пишевая отрасль', 'Рассматриваются проблемы  ...',NULL),
('IT', 'Широкая тема для рассуждений',NULL),
('Разработка', 'Подходы, шаблоны, паттерны проектировния',2);


INSERT INTO Articles
(name, description, category_id)
VALUES
('Пишевые красители в еде и их влияние на организм', 'Рассматриваются самые популярные добавки и ...',1),
('Фрейворки и библиотеки в экосистеме', 'Для оптимизации времени на написание сайта используются...',3),
('React и React Native', 'Различия и общие черты библиотек',3);
