# Banco de dados

Banco oficial: **MySQL 8**.

As migrações versionadas serão mantidas no backend em `backend/src/main/resources/db/migration` e executadas pelo Flyway. Esta pasta documenta convenções e decisões do modelo.

## Convenções

- Tabelas e colunas em `snake_case`.
- Chaves primárias e estrangeiras explícitas.
- Índices para chaves estrangeiras, campos de busca e filtros frequentes.
- Valores monetários em DECIMAL, nunca FLOAT/DOUBLE.
- Datas operacionais com tipo apropriado e timestamps de auditoria.
- Exclusão lógica ou restrições de integridade para registros com histórico operacional.
- Movimentações de estoque e histórico de status tratados como registros rastreáveis.

## Entidades previstas

users, roles, equipment, equipment_categories, equipment_status, work_orders, work_order_status_history, maintenance_types, failure_records, maintenance_plans, maintenance_checklists, parts, stock_movements, work_order_parts, employees, work_order_labor, suppliers, outsourced_services, work_order_services, equipment_meter_readings, cost_records, attachments e audit_logs.

O modelo relacional detalhado será documentado em `docs/data-model.md` antes da implementação das entidades.
