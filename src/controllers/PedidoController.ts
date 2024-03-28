import { Request, Response } from 'express';
import { Pedido } from '../models/Pedido';

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
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ message: 'Erro ao buscar pedido'});   
    }
};