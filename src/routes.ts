import express from 'express';
import knex from './database/connection';
// arquivo de administração das rotas
// a biblioteca express é usada para administrar rotas
// 'knex from .../connection' é a importação da conexão com o BD

import PointsController from './controllers/PointsController';
//importação do controller com a classe que possui o método de criação da rota /points

// Router é um método de rotas do express
const routes = express.Router();
// instanciando a class importada
const pointsController = new PointsController();

// rota: endereço completo da requisição (ex.: localhost:3333/users)
// recurso: qual entidade estamos acessando do sistema (ex.: /users)

// GET: buca uma ou mais informações do back-end
// POST: cria uma nova informação no back-end
// PUT: atualiza uma informação existente no back-end
// DELETE: remove uma informação do back-end

// POST http://localhost:3333/users - criar usuário
// GET http://localhost:3333/users - listar usuários
//GET http://localhost:3333/users/5 - busca dados do usuário de id 5


// Request param: parâmetro que vem na própria rota que identifica um recurso
// Query param: parâmetros que vem ma própria rota, geralmente opcionais, para filtros, paginação
// Request body: parâmetros para criação/atualização de informações

// rota para exibir itens
// async indica que é uma função assíncrona que não executará de imediato, por isso é necessário await, pois fazer querys em BDs são ações que demandam tempo
routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => { 
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        };
    });

    return response.json(serializedItems);
});

// rota para criação dos pontos de coleta
routes.post('/points', pointsController.create);

// exportação do servidor para qualquer arquivo que precisaremos delas, como o server por exemplo
export default routes;
