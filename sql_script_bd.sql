CREATE DATABASE `bd_reto_fullstack` ;
USE `bd_reto_fullstack` ;

CREATE TABLE `bd_reto_fullstack`.`todo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`));
  
  
CREATE TABLE `bd_reto_fullstack`.`task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `completed` BIT(1) NOT NULL,
  `id_todo` INT NOT NULL,
  PRIMARY KEY (`id`));


ALTER TABLE `bd_reto_fullstack`.`task` 
ADD CONSTRAINT `fk_todo_task`
  FOREIGN KEY (`id_todo`)
  REFERENCES `bd_reto_fullstack`.`todo` (`id`)
  ON DELETE CASCADE;
  
  