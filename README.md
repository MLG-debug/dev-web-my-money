## Trabalho final de Desenvolvimento Web
- Professor: Adriano Ferrasa

## Alunos
- Michael Lemes Gomes
- Gabriel Manesco de Oliveira

## Aplicação de controle financeiro
- Frontend: React.js
- Backend: Nest.js

## Frontend: 
### Funcionalidades:
- Visualização do resumo de entradas, saídas e um balanço geral das transações
- Criação de uma nova transação
- Pesquisa pela descrição das transações
- Pesquisa de transações pela categoria
- Criação de uma nova categoria
- Listagem das categorias
- Listagem das transações com paginação
- Visualização de um gráfico para analisar gasto mensal (por ano)

### Bibliotecas usadas:
- Axios: Axios é uma biblioteca JavaScript utilizada para fazer requisições HTTP a servidores. Ela simplifica o processo de fazer requisições assíncronas e oferece uma sintaxe fácil de usar tanto para o navegador quanto para o Node.js.
- Phosphor-React: Phosphor-React é uma biblioteca de ícones em SVG projetada para ser usada com o React. Ela fornece um conjunto abrangente de ícones bem projetados que podem ser facilmente incorporados em aplicativos React.
- React-Chartjs-2: React-Chartjs-2 é uma biblioteca de gráficos para React que fornece componentes reutilizáveis para exibir dados em forma de gráficos. Ela é baseada no Chart.js e permite criar gráficos interativos e personalizáveis com facilidade.
- React-DOM: React-DOM é uma biblioteca específica para o React que lida com a manipulação do DOM (Document Object Model). Ela é responsável por renderizar os componentes do React no navegador ou em um ambiente de servidor usando o Node.js.
- React-Hook-Form: React-Hook-Form é uma biblioteca de gerenciamento de formulários para React que utiliza os hooks do React para facilitar o controle e a validação de formulários. Ela fornece uma abordagem simples e eficiente para lidar com o estado do formulário e a validação dos campos.
- React-Number-Format: React-Number-Format é uma biblioteca para formatar números de forma fácil no React. Ela permite que você defina o formato de exibição de números, incluindo opções para casas decimais, separadores de milhares e símbolos de moeda.
- React-Router-DOM: React-Router-DOM é uma biblioteca de roteamento para React que permite navegar e gerenciar diferentes rotas em um aplicativo React. Ela fornece componentes para criar rotas e navegar entre elas de forma declarativa.
- React-Toastify: React-Toastify é uma biblioteca para exibir notificações (mensagens curtas) em aplicativos React. Ela facilita a exibição de notificações de sucesso, erro, aviso ou informações para os usuários de forma elegante e personalizável.
- Styled-Components: Styled-Components é uma biblioteca para estilizar componentes no React. Ela permite que você escreva estilos CSS em formato de código JavaScript, criando componentes React com estilos encapsulados e reutilizáveis.
- Use-Context-Selector: Use-Context-Selector é uma biblioteca para selecionar seletivamente partes de um contexto no React. Ela aprimora o gancho useContext do React, permitindo que você selecione apenas os dados necessários de um contexto em vez de renderizar novamente todo o componente quando qualquer parte do contexto é alterada.
- Zod: Zod é uma biblioteca de validação de esquemas para JavaScript e TypeScript. Ela permite que você defina esquemas de dados, aplique validações e verifique se os dados estão em conformidade com esses esquemas. É especialmente útil para validar entradas de formulários e interações com API.


## Backend: 
### Funcionalidades:
- CRUD para categoria  
- CRUD para transações
- Relacionamento: UMA categoria possui VÁRIAS transações (1-N)
- Teste unitário para cada caso de uso
- Patterns usados: Injeção de dependências, repository, controllers, mappers, DTOS, view-models, in-memory-database, factories, etc. 


### Rotas:
### Categorias:
``- Post: '/'      // Criação``
``- Put: '/:categoryId'      // Edição`
``- Patch: '/archive/:categoryId'      // Arquivar``
``- Get: '/'      // Obter todas sem paginação``
``- Get: '/:categoryId'      // Obter pelo ID``

### Transações:
``Post('/')      // Criação``
``Delete('/:transactionId')      // Exclusão``
``Put('/:transactionId')      // Editar``
``Get('/')      // Obter todas com paginação``
``Get('/details')      // Obter todas sem paginação e apenas com o tipo e valor``
``Get('/year')      // Obter todos os gastos mensais por ano``
``Get('/category/:categoryId')      // Obter todas por categoria``
``Get('/date')      // Obter todas por um intervalo de datas``
``Get('/search')      // Busca por transações pela query no campo descrição``
``Get('/:transactionId')      // Obter pelo ID``

### Bibliotecas usadas:
- Nest.js: Nest.js é um framework para desenvolvimento de aplicativos em Node.js que utiliza a arquitetura modular e orientada a serviços, proporcionando uma experiência semelhante ao Angular para a construção de aplicativos backend robustos e escaláveis.
- Express.js: Express.js é um framework web minimalista para Node.js, projetado para construir aplicativos web e APIs de forma rápida e simples, oferecendo uma abordagem leve e flexível para lidar com as requisições e respostas HTTP.
- Class-validator: Class-validator é uma biblioteca de validação para JavaScript e TypeScript, que permite a validação de objetos com base em regras pré-definidas ou personalizadas, facilitando a validação de dados e a implementação de lógicas de validação em aplicativos.
- Prisma: Prisma é uma ferramenta de mapeamento objeto-relacional (ORM) para bancos de dados, que simplifica a interação com bancos de dados em aplicativos Node.js e fornece uma camada de abstração para consultas e manipulação de dados.
- Jest: Jest é um framework de testes em JavaScript amplamente utilizado, que oferece uma experiência completa de testes para projetos Node.js e React, com recursos avançados, como mocking, cobertura de código e testes assíncronos.
