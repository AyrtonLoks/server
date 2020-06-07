import { Request, Response } from 'express';
import knex from '../database/connection';
// 'knex from .../connection' é a importação da conexão com o BD
// a biblioteca express é usada para administrar rotas

class ItemsController {
    // async indica que é uma função assíncrona que não executará de imediato, por isso é necessário await, pois fazer querys em BDs são ações que demandam tempo
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*');

        const serializedItems = items.map(item => { 
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.1.124:3333/uploads/${item.image}`,
            };
        });

        return response.json(serializedItems);
    }
}

export default ItemsController;
