const request = require('supertest');
import * as server from '../server';
const app = server.server;
import { Request, Response } from 'express';

describe('Teste da rota GetPedidoById', () => {
    it('deve retornar o pedido correto quando o ID é válido', async () => {
        const pedidoId = 1;
        const response = await request(app).get(`/pedidos/${pedidoId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', pedidoId);
    });
})