# RootChatEnvio

## BackEnd

# Visão Geral

RootChatEnvio é uma aplicação de chat moderna que utilizei as seguintes tecnologias: Express(Typescript), Prisma ORM, PostgreSQL e Docker, organizada com base nos princípios da Clean Architecture.

# Tecnologias Utilizadas

Prisma ORM,
PostgreSQL,
Docker,
Node.js,
Yarn

# Estrutura do Projeto

O projeto segue os princípios de Clean Architecture, com as responsabilidades divididas entre serviços, repositórios e controladores.

Serviços: Lógica de negócio e operações relacionadas ao chat.
Repositórios: Interações com o banco de dados.
Controladores: Manipulação das rotas de API e interações com os serviços.

# Como Executar a Aplicação

Instale as dependências:

yarn install

Inicie o banco de dados com Docker:

docker-compose up -d

Execute as migrações do Prisma:

npx prisma migrate dev

Inicie o servidor:

yarn dev

Acesse a aplicação:

Para enviar mensagens, acesse http://localhost:3000/message/send com um objeto JSON contendo as chaves text, fromMe, e senderName.

Para listar todas as mensagens, acesse http://localhost:3000/message

# As mensagens devem ser enviadas no seguinte formato JSON:

{
"text": "Conteúdo da mensagem",
"fromMe": true,
"senderName": "Nome do remetente"
}

Desenvolvedor: Gabriel Gomes
Email: gomez.amorim18@hotmail.com
