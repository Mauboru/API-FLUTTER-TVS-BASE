import { Request, Response } from 'express';
import { Produto, ProdutoInstance } from '../models/Produto';
import { Cliente, ClienteInstance } from '../models/Cliente';
import { Pedido, PedidoInstance } from '../models/Pedido';
import { ItemDoPedido } from '../models/ItemDoPedido';

export const getPedidoById = async (req: Request, res: Response) => {
    try {
        const pedidoId = parseInt(req.params.id, 10);
        const pedido = await Pedido.findByPk(pedidoId);

        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ message: 'Erro ao buscar pedido'});   
    }
};