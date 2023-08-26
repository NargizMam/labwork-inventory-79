create schema inventory collate utf8mb3_general_ci;
create table categories
(
    id          int auto_increment,
    categoriesTitle       varchar(100) not null,
    description text         null,
    constraint categories_pk
        primary key (id)
);
create table places
(
    id          int auto_increment,
    placesTitle       varchar(200) not null,
    description text         null,
    constraint places_pk
        primary key (id)
);
create table resources
(
    id          int auto_increment,
    title       varchar(200) not null,
    place_id    int          null,
    category_id int          null,
    description text null,
    image varchar(255) null,
    constraint resources_pk
        primary key (id),
    constraint resources_categories_id_fk
        foreign key (category_id) references categories (id)
            on update cascade on delete restrict ,
    constraint resources_places_id_fk2
        foreign key (place_id) references places (id)
            on update cascade on delete restrict
);

INSERT INTO inventory.categories (categoriesTitle, description) VALUES ('Бытовая техника', 'Все для уборки и приготовления пищи');
INSERT INTO inventory.categories (categoriesTitle, description) VALUES ('Мебель', 'Мягкая и твердая мебель');
INSERT INTO inventory.categories (categoriesTitle, description) VALUES ('Компьютерное оборудование', null);
INSERT INTO inventory.places (placesTitle, description) VALUES ('Кабинет директора', '1 корпус');
INSERT INTO inventory.places (placesTitle, description) VALUES ('Учительская', '1 корпус');
INSERT INTO inventory.places (placesTitle, description) VALUES ('Кабинет 200', '2 корпус');
INSERT INTO inventory.resources (title, place_id, category_id, description, image) VALUES ('Кресло компьютерное KK-345', 1, 2, null, null);
INSERT INTO inventory.resources (title, place_id, category_id, description, image) VALUES ('Микроволновая печь', 3, 1, null, null);
INSERT INTO inventory.resources (title, place_id, category_id, description, image) VALUES ('Ноутбук HP Probook 450', 1, 3, 'Самый лучший ноутбук', 'https://litech.kg/storage/products/April2023/NJnNerT4Fdm8QOGZp2pU.jpg');
INSERT INTO inventory.resources (title, place_id, category_id, description, image) VALUES ('Диван', 2, 2, '4х местный', null);
