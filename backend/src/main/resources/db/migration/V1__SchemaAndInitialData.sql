SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DELIMITER $$

CREATE DEFINER=`root`@`localhost` FUNCTION `year_diff` (`dateColA` DATE, `dateColB` DATE) RETURNS INT(11) BEGIN
   DECLARE diff INT;
   SET diff =  TIMESTAMPDIFF(YEAR, dateColA, dateColB);
   RETURN diff;
END$$

DELIMITER ;

CREATE TABLE `constructors` (
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `constructors` (`id`) VALUES
(1),
(2),
(3),
(4);

CREATE TABLE `contracts` (
  `id` bigint(20) NOT NULL,
  `begin_date` date DEFAULT NULL,
  `customer` varchar(255) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `leader_engineer_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `contracts` (`id`, `begin_date`, `customer`, `end_date`, `name`, `leader_engineer_id`) VALUES
(1, '2020-05-22', 'Хабаров А.П.', '2020-05-22', 'Договор №427323985', 9),
(2, '2020-05-22', 'Дмитриева А.Л.', NULL, 'Договор №122', 10),
(4, '2020-05-19', 'Литейный завод \"Ы\"', '2020-05-20', 'Договор №2342', 11);

-- Constraint for contract date ranges (if end_date is specified it should be less or equal to begin_date)
DELIMITER $$
CREATE TRIGGER `contract_daterange_constraint_insert` AFTER INSERT ON `contracts` FOR EACH ROW BEGIN
	IF NEW.end_date IS NOT NULL AND NEW.begin_date > NEW.end_date
	THEN CALL raise_error;
	END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `contract_daterange_constraint_update` AFTER UPDATE ON `contracts` FOR EACH ROW BEGIN
	IF NEW.end_date IS NOT NULL AND NEW.begin_date > NEW.end_date
	THEN CALL raise_error;
	END IF;
END
$$
DELIMITER ;

CREATE TABLE `contracts_projects` (
  `associated_contracts_id` bigint(20) NOT NULL,
  `projects_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `contracts_projects` (`associated_contracts_id`, `projects_id`) VALUES
(2, 1),
(4, 1),
(1, 2),
(2, 2),
(4, 3),
(1, 4);

CREATE TABLE `contracts_workgroup_employees` (
  `working_contracts_id` bigint(20) NOT NULL,
  `workgroup_employees_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `contracts_workgroup_employees` (`working_contracts_id`, `workgroup_employees_id`) VALUES
(1, 1),
(2, 2),
(2, 4),
(2, 6),
(1, 7),
(2, 8),
(1, 9),
(1, 10),
(2, 10),
(2, 11),
(4, 11),
(1, 13),
(2, 13),
(2, 14),
(1, 18),
(2, 18),
(4, 18),
(2, 19),
(4, 19),
(1, 20),
(2, 20),
(1, 21),
(4, 21);

CREATE TABLE `divisions` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `leader_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `divisions` (`id`, `name`, `leader_id`) VALUES
(1, 'аналитика', 18),
(3, 'тестирование оборудования', 13),
(4, 'разработка ', 1),
(5, 'дизайн ', 7),
(6, 'бухгалтерия', 16),
(7, 'маркетинг', 17),
(9, 'борьбы бобра с ослом', NULL);

--Constraint for division (leader of division must be in the division)
DELIMITER $$
CREATE TRIGGER `division_leader_constraint_divisions_insert` AFTER INSERT ON `divisions` FOR EACH ROW BEGIN
	IF NEW.leader_id IS NOT NULL
	THEN CALL raise_error;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `division_leader_constraint_divisions_update` AFTER UPDATE ON `divisions` FOR EACH ROW BEGIN
	DECLARE new_leader_division_id INTEGER;
	IF NEW.leader_id IS NOT NULL THEN
	BEGIN
		SET new_leader_division_id = (SELECT division_id FROM employees WHERE employees.id = NEW.leader_id);
		IF (new_leader_division_id IS NOT NULL) AND (new_leader_division_id <> NEW.id) THEN
			CALL raise_error;
        END IF;
	END;
	END IF;
END
$$
DELIMITER ;

CREATE TABLE `employees` (
  `entity_type` varchar(31) NOT NULL,
  `id` bigint(20) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `patronymic` varchar(255) DEFAULT NULL,
  `division_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `employees` (`entity_type`, `id`, `birth_date`, `first_name`, `last_name`, `patronymic`, `division_id`) VALUES
('constructors', 1, '1975-03-09', 'Анатолий', 'Петров ', 'Иванович', 4),
('constructors', 2, '1979-12-09', 'Лев', 'Санин', 'Николаевич', 4),
('constructors', 3, '1976-01-14', 'Игорь', 'Новичков', 'Александрович', 4),
('constructors', 4, '1973-06-17', 'Виктор', 'Ледов', 'Семенович', 4),
('otherEmployees', 5, '1977-05-05', 'Софья', 'Агафьева', 'Дмитриевна', 5),
('otherEmployees', 6, '1986-07-10', 'Кристина', 'Никитина', 'Олеговна', 5),
('otherEmployees', 7, '1996-07-10', 'Лидия', 'Кропачева', NULL, 5),
('otherEmployees', 8, '1996-04-13', 'Петр', 'Кириллов', 'Иванович', 5),
('engineers', 9, '1984-08-13', 'Иван', 'Великов', 'Иванович', 4),
('engineers', 10, '1982-03-17', 'Сергей', 'Воробьев', 'Антонович', 4),
('engineers', 11, '1982-02-11', 'Алиса', 'Воробьева', 'Михайловна', 4),
('technicians', 12, '1980-05-12', 'Андрей', 'Сафонов', NULL, 3),
('technicians', 13, '1996-02-11', 'Федор', 'Лесков', 'Иванович', 3),
('technicians', 14, '1991-04-22', 'Михаил', 'Резков', 'Иванович', 4),
('technicians', 15, '1978-09-18', 'Тимур', 'Токарев', 'Иванович', 7),
('otherEmployees', 16, '1996-06-02', 'Анна', 'Перепелкина', 'Сергеевна', 6),
('otherEmployees', 17, '1994-03-16', 'Николай', 'Фролов', 'Иванович', 7),
('otherEmployees', 18, '1989-08-01', 'Дмитрий', 'Квакин', NULL, 1),
('otherEmployees', 19, '1994-10-22', 'Виктория', 'Гасымова', 'Анатольевна', 7),
('otherEmployees', 20, '1992-04-03', 'Иван', 'Лукьянов', 'Николаевич', 1),
('otherEmployees', 21, '1978-03-09', 'Ксения', 'Сорокина', NULL, 6),
('technicians', 22, '1990-05-22', 'Кирилл', 'Пономарев', 'Олегович', 9);

--Remove division leader if it's moved to other division
DELIMITER $$
CREATE TRIGGER `division_leader_constraint_employees_update` AFTER UPDATE ON `employees` FOR EACH ROW BEGIN
    IF OLD.division_id <> NEW.division_id THEN
    	UPDATE divisions SET leader_id = NULL WHERE leader_id = OLD.id;
    END IF;
END
$$
DELIMITER ;

CREATE TABLE `engineers` (
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `engineers` (`id`) VALUES
(9),
(10),
(11);

CREATE TABLE `equipment` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `equipment_type_id` bigint(20) DEFAULT NULL,
  `owner_division_id` bigint(20) DEFAULT NULL,
  `using_project_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `equipment` (`id`, `name`, `equipment_type_id`, `owner_division_id`, `using_project_id`) VALUES
(1, '3D принтер \"КЕ5633\"', 2, 4, 2),
(2, 'Raspberry pi3', 1, 4, 4),
(3, 'mi note', 5, 4, 4),
(4, 'Asus 12764', 5, 5, 2),
(5, 'rtr 90-76', 6, 4, 2),
(6, 'SDF-213', 3, 4, 1),
(7, 'SDF-678', 3, 4, 3),
(8, 'ASUS 5534', 5, 5, 3),
(9, 'RT-323', 6, 4, 3),
(10, 'YTG-34', 1, 4, 3),
(11, 'RT-87', 1, NULL, 1);

-- Log equipment changes
DELIMITER $$
CREATE TRIGGER `equipment_usage_log_equipment_insert` AFTER INSERT ON `equipment` FOR EACH ROW BEGIN
	IF NEW.using_project_id IS NOT NULL THEN
	BEGIN
		INSERT INTO equipment_usage_log SET action_type="GET", date_time=NOW(), equipment_id=NEW.id, project_id=NEW.using_project_id;
	END;
	END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `equipment_usage_log_equipment_update` AFTER UPDATE ON `equipment` FOR EACH ROW BEGIN
	IF NOT NEW.using_project_id <=> OLD.using_project_id THEN
	BEGIN
		IF OLD.using_project_id IS NOT NULL
		THEN INSERT INTO equipment_usage_log SET action_type="RELEASE", date_time=NOW(), equipment_id=NEW.id, project_id=OLD.using_project_id;
		END IF;
		IF NEW.using_project_id IS NOT NULL
		THEN INSERT INTO equipment_usage_log SET action_type="GET", date_time=NOW(), equipment_id=NEW.id, project_id=NEW.using_project_id;
		END IF;
	END;
	END IF;
END
$$
DELIMITER ;

CREATE TABLE `equipment_types` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `equipment_types` (`id`, `name`) VALUES
(1, 'микроконтроллеры'),
(2, '3d принтер '),
(3, 'системы охлаждения'),
(4, 'гидростатическое оборудование'),
(5, 'компьютеры'),
(6, 'датчики');


CREATE TABLE `equipment_usage_log` (
  `id` bigint(20) NOT NULL,
  `action_type` varchar(255) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `equipment_id` bigint(20) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `equipment_usage_log` (`id`, `action_type`, `date_time`, `equipment_id`, `project_id`) VALUES
(1, 'GET', '2020-05-22 13:04:54', 1, 2),
(2, 'GET', '2020-05-22 13:05:24', 2, 4),
(3, 'GET', '2020-05-22 13:06:55', 3, 4),
(4, 'GET', '2020-05-22 13:07:21', 4, 2),
(5, 'GET', '2020-05-22 13:07:51', 5, 2),
(6, 'GET', '2020-05-22 13:08:25', 6, 1),
(7, 'GET', '2020-05-22 13:08:42', 7, 3),
(8, 'GET', '2020-05-22 13:09:14', 8, 3),
(9, 'GET', '2020-05-22 13:09:38', 9, 3),
(10, 'GET', '2020-05-22 13:09:54', 10, 3),
(11, 'GET', '2020-05-22 13:10:12', 11, 1),
(12, 'RELEASE', '2020-05-22 17:13:31', 3, 4),
(13, 'GET', '2020-05-22 17:13:31', 3, 3),
(14, 'RELEASE', '2020-05-22 17:13:36', 3, 3),
(15, 'GET', '2020-05-22 17:13:36', 3, 4),
(16, 'RELEASE', '2020-05-26 07:00:35', 3, 4),
(17, 'GET', '2020-05-26 07:00:51', 3, 4);

CREATE TABLE `other_employees` (
  `description` varchar(255) DEFAULT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `other_employees` (`description`, `id`) VALUES
(NULL, 5),
(NULL, 6),
(NULL, 7),
(NULL, 8),
(NULL, 16),
(NULL, 17),
(NULL, 18),
(NULL, 19),
(NULL, 20),
(NULL, 21);

CREATE TABLE `patents` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `constructor_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `patents` (`id`, `description`, `issue_date`, `name`, `constructor_id`) VALUES
(1, NULL, '2008-09-22', 'Программа автоматической калибровки', 1);

CREATE TABLE `privileges` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `privileges` (`id`, `name`) VALUES
(1, 'PRIV_EMPLOYEES'),
(2, 'PRIV_CONTRACTS'),
(3, 'PRIV_SUDO');


CREATE TABLE `projects` (
  `id` bigint(20) NOT NULL,
  `begin_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `leader_constructor_id` bigint(20) DEFAULT NULL,
  `leader_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `projects` (`id`, `begin_date`, `end_date`, `name`, `leader_constructor_id`, `leader_id`) VALUES
(1, '2020-05-22', NULL, 'Гидронасос статический', 1, NULL),
(2, '2020-07-01', '2020-10-01', 'Валиковый движок', 2, NULL),
(3, '2020-06-04', '2021-05-26', 'Ультрачастотный поглощатель', 4, NULL),
(4, '2020-03-01', '2020-05-01', 'Прошивка \"ТО12-98-88\"', 3, NULL);

-- Projects dates constraint
DELIMITER $$
CREATE TRIGGER `project_daterange_constraint_insert` AFTER INSERT ON `projects` FOR EACH ROW BEGIN
	IF NEW.end_date IS NOT NULL AND NEW.begin_date > NEW.end_date
	THEN CALL raise_error;
	END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `project_daterange_constraint_update` AFTER UPDATE ON `projects` FOR EACH ROW BEGIN
	IF NEW.end_date IS NOT NULL AND NEW.begin_date > NEW.end_date
	THEN CALL raise_error;
	END IF;
END
$$
DELIMITER ;

CREATE TABLE `projects_workgroup_employees` (
  `working_projects_id` bigint(20) NOT NULL,
  `workgroup_employees_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `projects_workgroup_employees` (`working_projects_id`, `workgroup_employees_id`) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 3),
(4, 3),
(3, 4),
(2, 6),
(1, 7),
(3, 7),
(3, 8),
(1, 9),
(3, 9),
(1, 10),
(3, 10),
(4, 10),
(2, 11),
(4, 11),
(3, 12),
(4, 12),
(1, 13),
(2, 14),
(3, 14),
(2, 15),
(3, 15),
(2, 16),
(4, 16),
(2, 17),
(1, 18),
(4, 18),
(3, 19),
(4, 19),
(2, 20),
(3, 20),
(1, 21),
(3, 21);

CREATE TABLE `project_works` (
  `id` bigint(20) NOT NULL,
  `cost` bigint(20) NOT NULL,
  `done` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `used_equipment_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `project_works` (`id`, `cost`, `done`, `name`, `project_id`, `used_equipment_id`) VALUES
(1, 10000, b'0', 'составление плана работы', 3, NULL),
(2, 5000, b'1', 'составление чертежа', 3, NULL),
(3, 1000, b'0', 'закачивание программ ', 4, NULL),
(4, 4000, b'1', 'полная прошивка ', 4, NULL),
(5, 10000, b'0', 'разработка частотного модуля', 3, NULL),
(6, 10000, b'1', 'автоматическая калибровка', 3, 8),
(7, 5000, b'0', 'изготовление шагомера ', 1, NULL),
(8, 554633, b'1', 'первоначальная поверка', 1, NULL);

CREATE TABLE `subcontractors` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `subcontractors` (`id`, `description`, `name`) VALUES
(1, 'работаем c 1923', 'ООО \"DigitalComp\"'),
(2, NULL, 'InfoTech company');

CREATE TABLE `subcontractor_works` (
  `id` bigint(20) NOT NULL,
  `cost` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `subcontractor_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `subcontractor_works` (`id`, `cost`, `name`, `project_id`, `subcontractor_id`) VALUES
(1, 100000, 'Оптимизация оборудования', 3, 2),
(2, 50900, 'Оптимизация оборудования', 2, 2),
(3, 10000, 'Изготовление оборудования на заказ', 3, 1);

CREATE TABLE `technicians` (
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `technicians` (`id`) VALUES
(12),
(13),
(14),
(15),
(22);

CREATE TABLE `technicians_servable_equipment_types` (
  `serving_technicians_id` bigint(20) NOT NULL,
  `servable_equipment_types_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `technicians_servable_equipment_types` (`serving_technicians_id`, `servable_equipment_types_id`) VALUES
(22, 1);

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL DEFAULT '$2y$10$op.hGOOGqCqG91OotJTfq.Ixt.rOoupwgHPtm9Xc1POqYs3/T3Npe',
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `last_secret` varchar(255) DEFAULT NULL,
  `last_recovery_attempt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `password`, `username`, `email`, `last_secret`, `last_recovery_attempt`) VALUES
(1, '$2y$10$op.hGOOGqCqG91OotJTfq.Ixt.rOoupwgHPtm9Xc1POqYs3/T3Npe', 'root', 'root@localhost', NULL, NULL),
(7, '$2a$10$K3Re0fgiN1q5M00vn2U4vudPLdqPAyOsNLnEhZSuDLq6yEbPCAQCW', 'anton', 'user@mail.ru', 'PQqrb9lMiF5JERD', NULL);

CREATE TABLE `users_privileges` (
  `users_id` bigint(20) NOT NULL,
  `privileges_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users_privileges` (`users_id`, `privileges_id`) VALUES
(1, 1),
(7, 1),
(1, 2),
(7, 2),
(1, 3);

--constraints
ALTER TABLE `constructors`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `contracts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKcrod29bdl3311tnwppn3rb4mx` (`leader_engineer_id`);

ALTER TABLE `contracts_projects`
  ADD PRIMARY KEY (`associated_contracts_id`,`projects_id`),
  ADD KEY `FKkwmqhlxokikr1fj611f9x2ve7` (`projects_id`);

ALTER TABLE `contracts_workgroup_employees`
  ADD PRIMARY KEY (`working_contracts_id`,`workgroup_employees_id`),
  ADD KEY `FKrh5aa9rxvvndxn0g2u43cal92` (`workgroup_employees_id`);

ALTER TABLE `divisions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKry4yklnduakan5bx9jwhfrc33` (`leader_id`);

ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK7doj8qks063s833d8hss4nsgn` (`division_id`);

ALTER TABLE `engineers`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKccqc7ixj6t25aiebphqk82ig6` (`equipment_type_id`),
  ADD KEY `FKcqwvi2em8o958qitkiui0cy1j` (`using_project_id`),
  ADD KEY `FKh9dgnb8y86vt0jy5c5cgpy704` (`owner_division_id`);

ALTER TABLE `equipment_types`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `equipment_usage_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKantw9n446xf6mq3ain8qbtbhc` (`project_id`),
  ADD KEY `FKee19cb8mp7rupd970dflfvvgh` (`equipment_id`);

ALTER TABLE `other_employees`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `patents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKi68ecjklmf7gtqlglkmvq6tn4` (`constructor_id`);

ALTER TABLE `privileges`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1qx5rk3y2w6fa3n7dm20b8pms` (`leader_constructor_id`),
  ADD KEY `FK4ijm2drt4rf6w3wwhxyvfitom` (`leader_id`);

ALTER TABLE `projects_workgroup_employees`
  ADD PRIMARY KEY (`working_projects_id`,`workgroup_employees_id`),
  ADD KEY `FK7ppjykgvt6bx20lb9gwwn3wlf` (`workgroup_employees_id`);

ALTER TABLE `project_works`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK21244wisxmq974r495vp9jyui` (`project_id`),
  ADD KEY `FKiayi3b9i3dxqcj48rjdjb6a46` (`used_equipment_id`);

ALTER TABLE `subcontractors`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `subcontractor_works`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK13ed5eoxdbs27aqnxlo1mw2oe` (`project_id`),
  ADD KEY `FKn38gxgxe3hqiuyn8w65x62gwh` (`subcontractor_id`);

ALTER TABLE `technicians`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `technicians_servable_equipment_types`
  ADD PRIMARY KEY (`serving_technicians_id`,`servable_equipment_types_id`),
  ADD KEY `FKqtkcmij7muvbmf5t48kvh03em` (`servable_equipment_types_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

ALTER TABLE `users_privileges`
  ADD PRIMARY KEY (`users_id`,`privileges_id`),
  ADD KEY `FK3y0ijeeyki0vp7yfs9yprcvaa` (`privileges_id`);

ALTER TABLE `constructors`
  ADD CONSTRAINT `FKglafs6hpu5ct6eb2vej11dcjx` FOREIGN KEY (`id`) REFERENCES `employees` (`id`);

ALTER TABLE `contracts`
  ADD CONSTRAINT `FKcrod29bdl3311tnwppn3rb4mx` FOREIGN KEY (`leader_engineer_id`) REFERENCES `engineers` (`id`) ON DELETE SET NULL;

ALTER TABLE `contracts_projects`
  ADD CONSTRAINT `FKkwmqhlxokikr1fj611f9x2ve7` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FKpd85uqa3yelitk2n12st400wc` FOREIGN KEY (`associated_contracts_id`) REFERENCES `contracts` (`id`) ON DELETE CASCADE;

ALTER TABLE `contracts_workgroup_employees`
  ADD CONSTRAINT `FKhaiyfc924gkthue2qo2hgyong` FOREIGN KEY (`working_contracts_id`) REFERENCES `contracts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FKrh5aa9rxvvndxn0g2u43cal92` FOREIGN KEY (`workgroup_employees_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE;

ALTER TABLE `divisions`
  ADD CONSTRAINT `FKry4yklnduakan5bx9jwhfrc33` FOREIGN KEY (`leader_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL;

ALTER TABLE `employees`
  ADD CONSTRAINT `FK7doj8qks063s833d8hss4nsgn` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`);

ALTER TABLE `engineers`
  ADD CONSTRAINT `FK54a4624am7fgxn3ajs7wfosvh` FOREIGN KEY (`id`) REFERENCES `employees` (`id`);

ALTER TABLE `equipment`
  ADD CONSTRAINT `FKccqc7ixj6t25aiebphqk82ig6` FOREIGN KEY (`equipment_type_id`) REFERENCES `equipment_types` (`id`),
  ADD CONSTRAINT `FKcqwvi2em8o958qitkiui0cy1j` FOREIGN KEY (`using_project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FKh9dgnb8y86vt0jy5c5cgpy704` FOREIGN KEY (`owner_division_id`) REFERENCES `divisions` (`id`) ON DELETE SET NULL;

ALTER TABLE `equipment_usage_log`
  ADD CONSTRAINT `FKantw9n446xf6mq3ain8qbtbhc` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FKee19cb8mp7rupd970dflfvvgh` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`) ON DELETE CASCADE;

ALTER TABLE `other_employees`
  ADD CONSTRAINT `FK9spethrtqfyqdqh8j45fjvf5i` FOREIGN KEY (`id`) REFERENCES `employees` (`id`);

ALTER TABLE `patents`
  ADD CONSTRAINT `FKi68ecjklmf7gtqlglkmvq6tn4` FOREIGN KEY (`constructor_id`) REFERENCES `constructors` (`id`) ON DELETE CASCADE;

ALTER TABLE `projects`
  ADD CONSTRAINT `FK1qx5rk3y2w6fa3n7dm20b8pms` FOREIGN KEY (`leader_constructor_id`) REFERENCES `constructors` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK4ijm2drt4rf6w3wwhxyvfitom` FOREIGN KEY (`leader_id`) REFERENCES `constructors` (`id`);

ALTER TABLE `projects_workgroup_employees`
  ADD CONSTRAINT `FK7ppjykgvt6bx20lb9gwwn3wlf` FOREIGN KEY (`workgroup_employees_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FKileo0bwm8i14fidm8s6acen3u` FOREIGN KEY (`working_projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

ALTER TABLE `project_works`
  ADD CONSTRAINT `FK21244wisxmq974r495vp9jyui` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FKiayi3b9i3dxqcj48rjdjb6a46` FOREIGN KEY (`used_equipment_id`) REFERENCES `equipment` (`id`) ON DELETE SET NULL;

ALTER TABLE `subcontractor_works`
  ADD CONSTRAINT `FK13ed5eoxdbs27aqnxlo1mw2oe` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FKn38gxgxe3hqiuyn8w65x62gwh` FOREIGN KEY (`subcontractor_id`) REFERENCES `subcontractors` (`id`) ON DELETE CASCADE;

ALTER TABLE `technicians`
  ADD CONSTRAINT `FKa0gf66ojs2ff1o9pa81hru06t` FOREIGN KEY (`id`) REFERENCES `employees` (`id`);

ALTER TABLE `technicians_servable_equipment_types`
  ADD CONSTRAINT `FKhw1skj9bvsd6s2fg3jv1ma2l5` FOREIGN KEY (`serving_technicians_id`) REFERENCES `technicians` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FKqtkcmij7muvbmf5t48kvh03em` FOREIGN KEY (`servable_equipment_types_id`) REFERENCES `equipment_types` (`id`) ON DELETE CASCADE;

ALTER TABLE `users_privileges`
  ADD CONSTRAINT `FK3y0ijeeyki0vp7yfs9yprcvaa` FOREIGN KEY (`privileges_id`) REFERENCES `privileges` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FKo3je5dm7n0iprepwx1hm94gwf` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

-- auto increment initial values
ALTER TABLE `contracts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `divisions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `employees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

ALTER TABLE `equipment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `equipment_types`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `equipment_usage_log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

ALTER TABLE `patents`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `privileges`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `projects`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `project_works`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `subcontractors`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `subcontractor_works`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;