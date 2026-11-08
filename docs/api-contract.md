# Contrato inicial da API

Base URL local: `http://localhost:8080/api`

Formato: JSON. Endpoints protegidos exigem `Authorization: Bearer <JWT>`.

## Disponíveis na fundação

| Método | Caminho | Acesso | Descrição |
|---|---|---|---|
| GET | /health | Público | Verificação simples da API |
| POST | /auth/login | Público | Autenticação e emissão JWT |
| GET | /equipment | Autenticado | Listagem paginada e filtros |
| GET | /equipment/{id} | Autenticado | Consulta de equipamento |
| POST | /equipment | ADMIN, MANAGER | Cadastro de equipamento |

### Login

```json
{
  "email": "admin@local.test",
  "password": "senha-configurada-no-ambiente"
}
```

Retorno contém `accessToken`, `tokenType` e `email`.

### Cadastro de equipamento

```json
{
  "name": "Retroescavadeira 01",
  "equipmentType": "Retroescavadeira",
  "brand": "Fabricante",
  "model": "Modelo",
  "meterType": "HOURMETER",
  "currentMeter": 1250.5,
  "location": "Unidade operacional"
}
```

O código interno é gerado quando não informado. Dados técnicos opcionais podem ser completados posteriormente.

### Paginação e filtros

`GET /equipment?search=retro&status=AVAILABLE&page=0&size=20`

- page começa em zero.
- size padrão 20, máximo 100.
- search consulta nome, código e marca.
- status filtra situação atual.

## Planejados — ainda não disponíveis

Os caminhos e contratos abaixo serão definidos antes de cada implementação: ordens de serviço, histórico de status, planos preventivos, leituras de horímetro, peças, movimentações de estoque, custos, fornecedores, anexos, relatórios e auditoria.
