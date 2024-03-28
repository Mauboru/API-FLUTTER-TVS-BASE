const request = require('supertest');
import * as server from '../server';
const app = server.server;

describe('Teste da rota GetClientById', () => {
    it('deve retornar o cliente correto quando o ID é válido', async () => {
        const clienteId = 1;
        const response = await request(app).get(`/clientes/${clienteId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', clienteId);
    });
})