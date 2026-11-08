# Guia de desenvolvimento local

## Requisitos

- Windows 11 (ou sistema compatível)
- Java JDK 21
- Maven 3.9+ (ou Maven Wrapper, quando adicionado)
- Node.js LTS e npm
- MySQL Server 8
- Git

## 1. Banco de dados

1. Inicie o serviço MySQL.
2. Abra `database/local-setup.sql` no MySQL Workbench e execute como administrador.
3. Altere a senha de exemplo antes de executar.
4. O Flyway cria e atualiza as tabelas ao iniciar a API.

## 2. Backend

1. Copie `backend/.env.example` para `backend/.env` (não versione o arquivo .env).
2. Preencha DB_URL, DB_USERNAME, DB_PASSWORD, JWT_SECRET e as credenciais do administrador.
3. O segredo JWT deve ter no mínimo 32 bytes e ser exclusivo por ambiente.
4. No terminal, entre em `backend` e execute:

```bash
mvn clean test
mvn spring-boot:run
```

API: `http://localhost:8080/api`

Swagger: `http://localhost:8080/api/swagger-ui.html`

Health: `http://localhost:8080/api/health`

O usuário administrador inicial só é criado quando FLEET_ADMIN_EMAIL e FLEET_ADMIN_PASSWORD estão definidos no ambiente no primeiro start. A senha deve ter pelo menos 12 caracteres. Não há endpoint público de cadastro.

## 3. Frontend

1. Entre na pasta `frontend`.
2. Copie `.env.example` para `.env.local`.
3. Confirme `VITE_API_BASE_URL=http://localhost:8080/api`.
4. Execute:

```bash
npm install
npm run dev
```

Aplicação: `http://localhost:5173`

Verificação de produção local:

```bash
npm run build
npm test
```

## 4. Segurança e dados

- Nunca envie `.env`, tokens, senhas ou dumps com dados pessoais ao Git.
- O frontend guarda o token de sessão em sessionStorage e envia Bearer JWT à API.
- O backend aplica autenticação; o cadastro de equipamento exige perfil ADMIN ou MANAGER.
- Não use dados fictícios para alimentar indicadores apresentados como reais.
- Antes de produção, configure HTTPS, gestão de segredos, backups testados, política de retenção, logs e monitoramento.
- Revise permissões MySQL, CORS, expiração/rotação de JWT e estratégia de armazenamento de anexos.

## Limitações atuais

A base inclui autenticação, perfis iniciais, cadastro/listagem de equipamentos e estrutura relacional dos domínios. Ordens de serviço, estoque transacional, preventiva, indicadores e relatórios ainda precisam de implementação funcional e testes de integração.
