import knex from 'knex';
import path from 'path';
// arquivo de conexão com o banco de dados
// knex é um pacote que nos permite escrever nossas querys em javascript para os bancos de dados, e com a possibilidades de utilizar quantos BD quisermos. Caso queiramos trocar o BD a qualquer momento, sem problemas
// path é um pacote que está incluso dentro do Node, e ele nos auxilia a lidar com caminhos

// path.resolve() é um método que une caminhos. Se tivermos um arquivo 'index.js' dentro de um diretório 'database', ele nos retornará algo semelhante a: database\index.js (no caso do SO Windows)
// __dirname é uma variável global, que devolve o caminho do diretório no qual ela foi chamada (o caminho para connection.ts) para criar um certo arquivo (no nosso caso, database.sqlite)

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;