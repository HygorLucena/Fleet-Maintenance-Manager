-- Execute no MySQL local como administrador.
CREATE DATABASE IF NOT EXISTS fleet_maintenance
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Altere a senha antes de executar. Não reutilize credenciais de produção.
CREATE USER IF NOT EXISTS 'fleet_app'@'localhost'
  IDENTIFIED BY 'CHANGE_THIS_LOCAL_PASSWORD_NOW';
GRANT ALL PRIVILEGES ON fleet_maintenance.* TO 'fleet_app'@'localhost';
FLUSH PRIVILEGES;
