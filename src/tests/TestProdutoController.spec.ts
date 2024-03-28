const request = require('supertest');
import * as server from '../server';
const app = server.server;

describe('Teste da rota GetProdutoById', () => {
    it('deve retornar o produto correto quando o ID é válido', async () => {
        const produtoId = 1;
        const response = await request(app).get(`/produtos/${produtoId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', produtoId);
    });
})