# Contact Web

## Sobre o Projeto

O presente projeto tem como objetivo proporcionar uma interface para criação e atualização de contatos de um usuário.

Consiste no front-end para consumir a api do projeto ContactApi.

## Executando o projeto

Este Projeto foi densevolvido utilizando nodejs na versão `v16.16.0`.\
Para obter o funcionamento esperado é recomendado que se utilize esta versão.

Para executar o projeto deve-se instalar suas dependências com o comando\
`npm intall` ou `yarn install`.

Após instaladas as dependências, inicie o programa em modo de desenvolvimento com o comando\
`npm start` ou `yarn start`.  

O programa vai estar executando na porta `http://localhost:3000` padrão do react, para alterar a porta padrão modifique o arquivo `package.json`.

## Funcionamento do Projeto

O projeto consiste em uma interface simples para criação, atualização e remoção de usuários.

Ao abrir o projeto pela primeira vez, a lista de usuários estará vazia. Você pode criar um usuário clicando no botão\
`NOVO USUÁRIO` no canto superior direito da tela.

Ao criar um usuário o mesmo será exibido em forma de tabela junto a seus contatos.

Para exclusão de um usuário use o ícone de `lixeira` referente a linha que o mesmo está poscionado, de forma semelhante o ícone de `lápis` pode ser usado para modificar um usuário existente.

As linhas de usuário na tabela podem ser expandidas para exibição de todos os seus contatos. Use os ícones nas linhas de contato para exclusão ou modificação deles.