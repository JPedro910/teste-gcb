# Gerenciador de Médicos - Teste Desenvolvedor Full-stack GCB

<p>🚀 Aplicação voltada para gerenciar médicos</p>

# Status da Aplicação
<p>🔥 Aplicação Finalizada</p>

# Features
- Criação de Médicos
- Atualização de Médicos
- Leitura de Médicos
- Exclusão de Médicos
- Pesquisa de Médicos

# Tecnologias
- Typescript
- Node
- Nest
- Swagger
- Typeorm
- Jest
- Next

# Clonagem

Para executar a aplicação, você precisa instalar o Docker em sua máquina, após isso rode o seguinte comando:
```sh
  git clone https://github.com/JPedro910/teste-gcb.git
```
# Execução

Após clonar a aplicação, entre em sua pasta e rode o seguinte comando:
```sh
  docker-compose up
```

Após o container do banco de dados ser iniciado, você deve rodar na pasta da aplicação, o comando abaixo. Ele criará o banco de dados em que a API se conectará, se esse comando for dado após a inicialização completa da API, ela falhará em sua execução, com isso só será preciso reiniciar a composição dos containêrs:
```sh
  docker exec -i mysql-container-joao-pedro-mns-gcb mysql -uroot -pmysql < database/database.sql
```

# Testes

- A aplicação conta com testes unitários, de integração e E2E

Para rodar os testes unitários, no container da API execute o seguinte comando:
```sh
  yarn test units/
```

Para rodar os testes de integração, no container da API execute o seguinte comando:
```sh
  yarn test integrations/
```

Para rodar os testes E2E, no container da API execute o seguinte comando:
```sh
  yarn test e2e/
```

Para rodar todos os testes, no container da API execute o seguinte comando:
```sh
  yarn test
```

# Observações

Para acessar a documentação, acesse o link:
```sh
  http://localhost:3333/documention
```
