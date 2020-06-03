import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
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
            image: 'image-fake',
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
                point_id,
            };
        });

        //inserção da relação das tabelas points e items na tabela intermediária
        await trx('point_items').insert(pointItems);

        //spread operator (...point) pega todas as informações desse objeto e retorna dentro de outro obj
        return response.json({ 
            id: point_id,
            ...point,
         });
    }
}

export default PointsController;