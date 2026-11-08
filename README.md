# Fleet Maintenance Manager

Sistema web de gestão de manutenção de frotas (CMMS), desenvolvido com arquitetura própria e foco em rastreabilidade operacional, custos, estoque, manutenção preventiva e indicadores de confiabilidade.

> **Status:** planejamento e fundação do projeto. Ainda não é uma versão pronta para produção.

## Stack definida

- **Frontend:** React + TypeScript + Vite
- **Backend:** Java 21 + Spring Boot 3.x
- **Persistência:** MySQL 8 + Spring Data JPA
- **Segurança:** Spring Security (autenticação e autorização por perfil)
- **API:** REST + OpenAPI/Swagger
- **Migrações:** Flyway
- **Testes:** JUnit 5, Mockito, Spring Boot Test, Vitest e React Testing Library

## Módulos planejados

1. Dashboard e indicadores
2. Cadastro e histórico de equipamentos
3. Ordens de serviço e histórico de status
4. Planos e programação de manutenção preventiva
5. Estoque e movimentação de peças
6. Fornecedores e serviços terceirizados
7. Custos, relatórios e exportações
8. Usuários, perfis e auditoria

## Estrutura do repositório

```text
frontend/   Aplicação React + TypeScript
backend/    API Java + Spring Boot
database/   Documentação e recursos do banco de dados
docs/       Arquitetura, modelo de dados e decisões técnicas
```

## Princípios do projeto

- O backend Spring Boot é a fonte oficial dos dados.
- O frontend consome exclusivamente a API REST para operações de negócio.
- MySQL é o banco relacional oficial.
- Dados demonstrativos, quando adicionados, serão explicitamente identificados como fictícios.
- Valores monetários usam precisão decimal; datas e horários são armazenados com rastreabilidade.
- Regras críticas (estoque, encerramento de OS, custos e permissões) são validadas no backend.
- Segredos e credenciais nunca devem ser versionados.

## Estado do desenvolvimento

O projeto será implementado em etapas, com documentação, testes automatizados e commits incrementais. Funcionalidades não implementadas não devem ser consideradas disponíveis.

## Execução local

As instruções completas de instalação e execução serão adicionadas conforme a estrutura do backend e frontend for criada.

## Licença

A licença será definida antes da primeira publicação pública do repositório.
