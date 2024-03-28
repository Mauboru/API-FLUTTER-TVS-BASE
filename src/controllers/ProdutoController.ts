import { Request, Response } from 'express';
import { Produto } from '../models/Produto';

export const getProdutoById = async (req: Request, res: Response) => {
    try {
        const produtoId = parseInt(req.params.id, 10);
        const produto = await Produto.findByPk(produtoId);

        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ message: 'Erro ao buscar produto'});
    }
};