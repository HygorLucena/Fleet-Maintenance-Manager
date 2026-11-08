# Segurança — baseline

## Implementado na fundação

- Spring Security sem sessão de servidor.
- Tokens JWT assinados com chave HMAC configurável.
- BCrypt para armazenamento de senhas.
- Papéis iniciais ADMIN, MANAGER, TECHNICIAN e WAREHOUSE.
- Criação opcional do primeiro administrador por variáveis de ambiente.
- Rotas de autenticação e health públicas; demais rotas autenticadas.
- Cadastro de equipamento restrito a ADMIN e MANAGER.
- CORS configurável por ambiente.

## Requisitos antes de produção

- Substituir segredo JWT de desenvolvimento por segredo aleatório gerenciado em cofre.
- Usar HTTPS obrigatório e política de rotação/revogação de tokens.
- Implementar gestão administrativa de usuários, alteração/reset de senha e bloqueio de contas.
- Revisar autorização método a método para cada recurso e ação.
- Adicionar rate limiting no login, proteção contra brute force e trilha de tentativas.
- Definir política de backup, retenção e restauração do banco.
- Validar uploads por tamanho, extensão, MIME, antivírus e armazenamento privado.
- Evitar expor stack traces, dados pessoais ou credenciais em logs.
- Revisar CORS, cabeçalhos HTTP e política de sessão conforme ambiente.
- Executar análise de dependências e testes de segurança em CI.

A autenticação inicial não deve ser interpretada como auditoria de segurança ou certificação de prontidão para produção.
