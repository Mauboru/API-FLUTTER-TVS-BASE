const request = require('supertest');
import * as server from '../server';
const app = server.server;

describe('Teste da rota GetItemDoPedidoById', () => {
    it('deve retornar o pedido correto quando o ID é válido', async () => {
        const itemPedidoId = 1;
        const response = await request(app).get(`/itensDoPedido/${itemPedidoId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', itemPedidoId);
    });
})