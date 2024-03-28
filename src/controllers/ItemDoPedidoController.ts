import { Request, Response } from 'express';
import { ItemDoPedido } from '../models/ItemDoPedido';

export const getItemDoPedidoById = async (req: Request, res: Response) => {
    try {
        const itemDoPedidoId = parseInt(req.params.id, 10);
        const itemDoPedido = await ItemDoPedido.findByPk(itemDoPedidoId);

        if (itemDoPedido) {
            res.json(itemDoPedido);
        } else {
            res.status(404).json({ message: 'Item do Pedido não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar Item do Pedido:', error);
        res.status(500).json({ message: 'Erro ao buscar Item do Pedido'});
    }
};