# Ambiente

- ```trocar versão do nome: nvm install v14.15.0```
- ```yarn init -y```
- ```yarn add typescript jest @types/jest ts-node ts-jest nodemon```
- ```npx tsc --init```
- ```npx ts-jest config:init```

# Conceitos

- Entidades:
  -  Tem regras de negócio independente, que se aplica em qualquer situação.
  -  Testes unitários.
  -  Regras de negócio independentes:
     -  CPF do cliente é válido?
     -  Valor total do pedido, considerando os itens e a quantidade de cada um.
     -  Aplicar desconto no pedido.
- Não são as mesmas que utilizamos em um ORM
- São considerados componentes de alto nível de abstração e por serem estáveis mudam com menos frequência que outras camadas, podendo ser reusados com facilidade.

- Caso de uso: 
  - É uma técnica para capturar, modelar e especificar requisitos.
  - Fala com controller, repositório, gateways, presenters. Conversa com os recursos necessários para executar a regra de negócio e com o domínio. 
  - Teste integrado.
  - Conhece a entity, mas a entity não o conhece.
  - É o centro da aplicação.
  - É diferente de CRUD.
  - Geralmente, envolve um tipo de persistência. Pode usar: repositório, DAO, Gateway, Active Record, Data Mapper. Porém, o caso de uso deve conhecer apenas a interface. Essa implementação é feita pelo design patter Adapter, por isso essa camada se chama interface adapter. Todo SQL pertence a essa camada.
  - Exemplos:
    - Fazer um pedido
    - Cancelar um pedido
    - Simular o frete
    - Validar um cupom de desconto
    - Realizar um pagamento
    - Emitir uma nota fiscal

- Repositório
  - É uma abstração para uma coleção de agregados, normalmete associado ao Domain-Driven Design.

- DAO (Data Access Object)
  - É um padrão de estrutura que separa a camada de domínio da persistência, oferecendo uma interface.

- Gateway
  - É um objeto que encapsula o acesso à um sistema externo ou recurso.

- Active Record
  - Um registro em uma tabela do banco de dados é encapsulado em um objeto, juntando conceitos de domínio e persistência.

- Data Mapper
  - É o que os ORMS fazem, movem dados de um objeto para o banco de dados e vice-versa.

- Driver
  - Um driver é o nível mais baixo de abstração, é o componente que realiza a conexão com o banco de dados ou realiza requisições HTTP.
  - Essa camada geralmente configura a relação com frameworks e bibliotecas.

- Dependency Rule
  - Quem está fora, conhece quem está dentro. Porém, quem está dentro, não conhece quem está fora.

O main é o ponto de entrada da aplicação (HTTP, CLI, UI, Testes), é lá que as fábricas e estratégias são inicializadas e as injeções de dependência são realizadas durante a inicialização.