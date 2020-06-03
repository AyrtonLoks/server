import { Request, Response } from 'express';
import knex from '../database/connection';
// 'knex from .../connection' é a importação da conexão com o BD
// a biblioteca express é usada para administrar rotas

class PointsController {
    // async indica que é uma função assíncrona que não executará de imediato, por isso é necessário await, pois fazer querys em BDs são ações que demandam tempo
    async index (request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }

    async show (request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'point not found.' });
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point, items });
    }

    async create (request: Request, response: Response) {
    // a primeira const (de objetos) é uma desestruturação de objetos em JS, fazemos isso, pois, sabemos a estrutura do objeto em que estamos pegando seus dados - request.body (que virá do front-end)
        const {
            name, 
            email, 
            whatsapp, 
            latitude, 
            longitude, 
            city, 
            uf, 
            items
        } = request.body;

        //constante que não permite a execução de uma query se a outra falhar
        const trx = await knex.transaction();

        //constante do ponto de coleta através dos dados obtidos pelo request.body
        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            //as formas de declaração abaixo são denominadas como short-sintaxe, pois, a variável declarada possui o mesmo nome da propriedade do objeto que estamos declarando (ex.: name: name)
            name, 
            email, 
            whatsapp, 
            latitude, 
            longitude, 
            city, 
            uf
        };
        
        //criação do ponto de coleta, inserção de dados na tabela points
        const insertedIds = await trx('points').insert(point);

        //constante de armazenamento do índice do objeto acima, para que, então, possamos fazer exatamente a inserção das informações coletadas naquele exato momento
        const point_id = insertedIds[0];

        //constante que irá fazer a relação de uma tabela a outra pelos seus respectivos ids
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        });

        //inserção da relação das tabelas points e items na tabela intermediária
        await trx('point_items').insert(pointItems);

        await trx.commit();

        //spread operator (...point) pega todas as informações desse objeto e retorna dentro de outro obj
        return response.json({
            id: point_id, 
            ...point
        });
    }
}

export default PointsController;