# cripto

## Sobre

Esse sistema trabalha com armazenagem de cripto moedas. Um sistema simples feito para fins de estudo e que pode ser usado para referencias de clean architecture e hexagonal architecture.

## testes unitarios

```
npm run test
```

## Como rodar localmente

### instalar dependencias

Para rodar o sistema localmente (apos ter clonado o repositorio), primeiro voce pode instalar as dependencias:

```
npm run i
```

### Criar a base de dados

Agora voce deve se conectar ao seu mysql (que ja deve estar devidamente instalado e configurado) e criar a base de dados chamada "cripto".

```
mysql -u root -p
create database cipto
```

### Rodar as migrates

```
npm run migrate:latest
```

### Subir a aplicacao

```
npm run dev
```

FIM.

## Rotas

`POST - /user` Cria um novo usuario. <br>
Body:

```
{
    name: string;
    email: string;
    password: string;
    function: "client" | "admin"
}
```

Ela retorna o id do usuario cadastrado.<br>

`GET - /user/:userid` Essa rota vai retornar um ususario pelo seu id

`PUT - /user` Essa rota vai atualizar um usuario
Body:

```
{
    id: string;
    name?: string;
    email?: string;
    password?: string;
    function?: "client" | "admin"
}
```

Com excessao do id, os outros parametros sao opcionais, voce somente passa os campos que quer alterar<br>

`POST - /get-save-coins` Essa rota obtem todas as cripto moedas da coingecko e insere na sua base de dados<br>
Caso voce rode ela mais de uma vez, ela nao vai inserir as criptos que ja foram inseridas

`GET /list-coins` Essa rota lista todas as criptos que foram armazenadas.<br>

`POST - get-save-history/:id` Essa rota obtem o historico das ultimas 24h de uma determinada cripto coin.<br>
O historico tem preco da cripto a cada 5 minutos.<br>
Ele nao vai inserir historicos ja inseridos.<br>
A ideia é termos algo como um `rundeck` que roda 1 vez por dia e atualiza esse historico diariamente.<br>

`GET /history?id=&range=` Essa rota lista o historico de uma determinada cripto coin<br>
Para conseguir obter o historico, voce deve fornecer o id da cripto coin e um range. Esse range tem duas possibilidades de valores: 7d ou 24h.<br>
Caso o range seja "7d" ele vai trazer o historico da cripto dos ultimos 7 dias e caso seja 24h, ele retorna os valores das ultimas 24h.<br>
