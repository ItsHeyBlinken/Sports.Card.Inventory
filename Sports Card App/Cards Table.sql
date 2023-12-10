
CREATE DATABASE IF NOT EXISTS sports_card_inventory;

USE sports_card_inventory;

CREATE TABLE IF NOT EXISTS cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  set_name VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  card_number VARCHAR(255) NOT NULL,
  player_name VARCHAR(255) NOT NULL
);
