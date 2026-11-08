# Fleet Maintenance Manager

Sistema web de gestão de manutenção de frotas (CMMS), com foco em rastreabilidade operacional, custos, estoque, manutenção preventiva e indicadores de confiabilidade.

> **Status:** fundação técnica e primeiro fluxo de equipamentos em desenvolvimento. Ainda não é uma versão pronta para produção.

## Stack oficial

- **Frontend:** React 19 + TypeScript + Vite
- **Backend:** Java 21 + Spring Boot 3.5
- **Persistência:** MySQL 8 + Spring Data JPA
- **Migrações:** Flyway
- **Segurança:** Spring Security + JWT + BCrypt
- **API:** REST + OpenAPI/Swagger
- **Testes:** JUnit 5, Mockito, Spring Boot Test, Vitest e React Testing Library

## Estrutura

```text
backend/
  src/main/java/com/fleetmaintenance/
    auth/ config/ common/ equipment/ health/ security/ users/
  src/main/resources/db/migration/
  src/test/
frontend/
  src/services/
  src/test/
  src/App.tsx
database/
docs/
```

## Módulos do produto

1. Dashboard e indicadores
2. Equipamentos e leituras de horímetro/hodômetro
3. Ordens de serviço e histórico de status
4. Planejamento preventivo e checklists
5. Estoque, peças e movimentações
6. Fornecedores, mão de obra e serviços terceirizados
7. Custos, relatórios e exportações
8. Usuários, perfis e auditoria

O schema inicial já reserva tabelas para os domínios acima. Nem todas as operações possuem API/tela funcional ainda; consulte [docs/development-guide.md](docs/development-guide.md) e [docs/architecture.md](docs/architecture.md).

## O que já existe na base

- Estrutura Maven com Java 21 e Spring Boot.
- Configuração MySQL e migração inicial Flyway.
- Login JWT, senha BCrypt, perfis ADMIN, MANAGER, TECHNICIAN e WAREHOUSE.
- Provisionamento opcional de administrador por variáveis de ambiente.
- Tratamento global inicial de erros, CORS configurável e Swagger.
- Cadastro e consulta paginada de equipamentos via API.
- Shell responsivo React, login e tela de equipamentos conectada à API.
- Testes iniciais backend/frontend e guia de execução local.

## Executar localmente

Consulte o guia completo: [Guia de desenvolvimento](docs/development-guide.md).

Resumo:

1. Instale Java 21, Maven 3.9+, Node.js LTS e MySQL 8.
2. Configure o banco com `database/local-setup.sql`.
3. Configure as variáveis de ambiente conforme `backend/.env.example` e `docs/development-guide.md` (Spring Boot não carrega `.env` automaticamente).
4. Em `backend/`: `mvn clean test` e `mvn spring-boot:run`.
5. Em `frontend/`: `npm install`, copie `.env.example` para `.env.local` e execute `npm run dev`.

A API fica em `http://localhost:8080/api`, Swagger em `/api/swagger-ui.html` e frontend em `http://localhost:5173`.

## Regras de engenharia

- O backend é a fonte oficial dos dados; frontend consome API REST.
- MySQL 8 é o banco oficial. Não usar Supabase, Firebase, Node/Express ou PostgreSQL como substitutos.
- Dinheiro usa DECIMAL no banco e BigDecimal no Java.
- Estoque, encerramento de OS, custos e permissões devem ser transacionais e validados no backend.
- Histórico de status, leituras de horímetro e auditoria devem preservar rastreabilidade.
- Indicadores sem dados suficientes retornam N/D; não fabricar valores.
- Dados de demonstração, quando existirem, serão identificados como fictícios.
- Nunca versionar credenciais, tokens, arquivos .env ou dados pessoais.

## Próximas entregas

1. Completar gestão de usuários e permissões.
2. Completar edição, desativação, categorias, anexos e histórico dos equipamentos.
3. Implementar ordens de serviço e transições auditáveis.
4. Implementar estoque transacional e custos sem dupla contabilização.
5. Implementar planos preventivos, leituras e alertas.
6. Implementar indicadores, dashboard real, relatórios PDF/Excel.
7. Testes de integração, segurança e preparação para produção.

## Licença

Este projeto é distribuído sob a licença [MIT](LICENSE). Você pode usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e comercializar o software, desde que mantenha o aviso de copyright e o texto da licença nas cópias ou partes substanciais. O software é fornecido “como está”, sem garantias. Consulte o arquivo [LICENSE](LICENSE) para o texto integral.
