import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';
// arquivo de administração das rotas
// a biblioteca express é usada para administrar rotas

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
//importação dos controllers com as classes que possuem os métodos de criação das rotas /points e /items

import multerConfig from './config/multer';

// Router é um método de rotas do express
const routes = express.Router();
const upload = multer(multerConfig);

// instanciando as classes importadas
// index (listar vários), show (listar um único), create, update, delete
const pointsController = new PointsController();
const itemsController = new ItemsController();

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
routes.get('/items', itemsController.index);

// rota para criação dos pontos de coleta
routes.post(
    '/points', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

// exportação das rotas para qualquer arquivo que precisaremos delas, como o server por exemplo
export default routes;
// coisas para ver depois:
// Service Pattern
// Repository Pattern (Data Mapper)