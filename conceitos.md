# Entidades

  -  Tem regras de negócio independente, que se aplica em qualquer situação.
  -  Testes unitários.
  -  Regras de negócio independentes:
     -  CPF do cliente é válido?
     -  Valor total do pedido, considerando os itens e a quantidade de cada um.
     -  Aplicar desconto no pedido.
- Não são as mesmas que utilizamos em um ORM
- São considerados componentes de alto nível de abstração e por serem estáveis mudam com menos frequência que outras camadas, podendo ser reusados com facilidade.

<br>

# Caso de uso

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

<br>

# Repositório

  - É uma abstração para uma coleção de agregados, normalmete associado ao Domain-Driven Design.

<br>

# DAO (Data Access Object)
  - É um padrão de estrutura que separa a camada de domínio da persistência, oferecendo uma interface.

<br>

# Gateway
  - É um objeto que encapsula o acesso à um sistema externo ou recurso.

<br>

# Active Record
  - Um registro em uma tabela do banco de dados é encapsulado em um objeto, juntando conceitos de domínio e persistência.

<br>

# Data Mapper
  - É o que os ORMS fazem, movem dados de um objeto para o banco de dados e vice-versa.

<br>

# Driver
  - Um driver é o nível mais baixo de abstração, é o componente que realiza a conexão com o banco de dados ou realiza requisições HTTP.
  - Essa camada geralmente configura a relação com frameworks e bibliotecas.

- Dependency Rule
  - Quem está fora, conhece quem está dentro. Porém, quem está dentro, não conhece quem está fora.

<br>

# Main

O main é o ponto de entrada da aplicação (HTTP, CLI, UI, Testes), é lá que as fábricas e estratégias são inicializadas e as injeções de dependência são realizadas durante a inicialização.

<br>
<hr>
<br>

# CQRS

- Muito usado em microsserviços e para processar coisas mais pesadas - performance

- Envolve separar os comandos que processam regras de negócio e realizam mutação de estado, das consultas que retornam apenas uma projeção sobre os dados armazenados.

- Promove a separação entre o modelo de escrita e leitura.

<br>

> Comandos

<br>

- implementam regras de negócio
- fazem mutação de dados, ou seja, executam tarefas que envolvem inserir, atualizar ou deletar infos no banco de dados
- eventualmente, podem ser colocados em uma fila e processados de forma assíncrona
- emitem eventos que desencadeiam processo de negócio complexos

<br>

> Consultas

<br>

- não envolvem mutação de dados
- retornam informações por meio de um DTO
- acessam os dados de uma forma simples e direta ainda que seja a mesma base de dados atualizada pelos comandos
- podem usar uma base de dados segregada

<br>

> Normalização

<br>

- mais relevantes para escrita
- usado para reduzir a duplicação de dados entre diferentes tabelas, otimizando a ocupação de disco e também o risco de atualizar uma informação em uma tabela esquecendo das outras
- garantir a consistência nas operações reaalizadas sobre os dados
- permite combinações
- não é recomendado renderizar relatórios ou estatísticas complexas a partir do banco de dados utilizado para escrita, principalmente se ele for relacional