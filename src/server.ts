import express from 'express';
import path from 'path';
import routes from './routes';
// arquivo do servidor
// a biblioteca express é usada para administrar rotas

const app = express();

// para que o express entenda o formato json

app.use(express.json());

// importamos as rotas do arquivo routes e assim fazemos com que o servidor fique separado das rotas em arquivos diferentes
app.use(routes);

// criação de uma rota para acesso das imagens de cada item pelo navegador
// static é um método para uso de/servir arquivos estáticos como imagens, pdf, .doc
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);
