const request = require("supertest");
import * as server from "../server";
import { app } from "../server"; // Certifique-se de que o caminho está correto
import { Request, Response } from "express";
import { Produto } from "../models/Produto";
import { ItemDoPedido } from "../models/ItemDoPedido";

describe("Teste da Rota incluirItemDoPedido", () => {
  let itemDoPedidoId: number;

  it("Deve incluir um novo item do pedido com sucesso", async () => {
    const novoItemDoPedido = {
      id_pedido: 112,
      id_produto: 111,
      qtdade: 10
    };

    const response = await request(app).post("/incluirItemDoPedido").send(novoItemDoPedido);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id_pedido).toBe(novoItemDoPedido.id_pedido);
    expect(response.body.id_produto).toBe(novoItemDoPedido.id_produto);

    itemDoPedidoId = response.body.id;
  });
});

describe("Teste da Rota GetItemDoPedidoById", () => {
  it("Deve retornar o item do pedido correto quando o id é valido", async () => {
    const idItemDoPedido = 109;
    const response = await request(app).get(`/itensDoPedido/${idItemDoPedido}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("itemDoPedido.id", idItemDoPedido);
  });

  it("Deve retornar um status 404 quando o Id do item do pedido nao existe", async () => {
    const idItemDoPedido = 999;

    const response = await request(app).get(`/itensDoPedido/${idItemDoPedido}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Item do Pedido não encontrado");
  });

  it("Deve retornar o item do pedido com informações do cliente", async () => {
    const idItemDoPedido = 109;
    const response = await request(app).get(`/itensDoPedido/${idItemDoPedido}`);
  
    expect(response.status).toBe(200);
    expect(response.body.itemDoPedido.pedido).toHaveProperty("cliente");
    expect(response.body.itemDoPedido.pedido.cliente).toHaveProperty("nome");
    expect(response.body.itemDoPedido.pedido.cliente).toHaveProperty("sobrenome");
  });
  
  it("Deve verificar se no retorno da rota tem informações do pedido e do e do produto", async () => {
    const idItemDoPedido = 109;
    const response = await request(app).get(`/itensDoPedido/${idItemDoPedido}`);
  
    expect(response.status).toBe(200);
    expect(response.body.itemDoPedido.pedido).toHaveProperty("cliente");
    expect(response.body.itemDoPedido.pedido).toHaveProperty("data");
    expect(response.body.itemDoPedido.produto).toHaveProperty("descricao"); 
  });

  it("Deve retornar 404 se o item do pedido não for encontrado", async () => {
    const id = 1;
    const response = await request(app).get(`/itensDoPedido/${id}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Item do Pedido não encontrado");
  });

  it("Deve retornar o item do pedido em menos de 200ms", async () => {
    const start = Date.now();
    const response = await request(app).get("/itensDoPedido");
    const duration = Date.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(200);
  });

  it("Deve retornar 400 se o ID não for um número", async () => {
    const id = "A";
    const response = await request(app).get(`/itensDoPedido/${id}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Erro ID não é um número");
  });
});

describe("Teste da Rota listarItensDoPedidos", () => {
  it("Deve retornar uma lista de itens dos pedidos", async () => {
    const response = await request(app).get("/itensDoPedido");

    expect(response.status).toBe(200);
    expect(response.body.itensDoPedido).toBeInstanceOf(Array);
  });

  it("Deve retornar a lista de itens dos pedidos dentro de um tempo aceitavel", async () => {
    const start = Date.now();
    const response = await request(app).get("/itensDoPedido");
    const duration = Date.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(200);
  });
});

describe("Teste da Rota excluirItemDoPedido", () => {
  beforeAll(async () => {
    await ItemDoPedido.create({ id: 99, id_pedido: "112", id_produto: "111", qtdade: 1});
  });

  afterAll(async () => {
    await ItemDoPedido.destroy({ where: { id: 99 } });
  });

  it("Deve excluir um item do pedido existente", async () => {
    const response = await request(app).delete("/excluirItemDoPedido/99");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Item do Pedido excluído com sucesso");

    const itemDoPedidoExcluido = await ItemDoPedido.findByPk(99);
    expect(itemDoPedidoExcluido).toBeNull();
  });
});

// describe("Teste da Rota atualizarItemDoPedido", () => {
//   let itemDoPedidoId: number;
//   let itemDoPedidoExistenteId: number;

//   beforeAll(async () => {
//     const itemDoPedido = await ItemDoPedido.create({
//       id: 88,
//       id_pedido: 111, 
//       id_produto: 112, 
//       qtdade: 10
//     });

//     itemDoPedidoExistenteId = itemDoPedido.id;

//     const itemDoPedidoParaAtualizar = await ItemDoPedido.create({
//       id: 99,
//       id_pedido: 5, 
//       id_produto: 115, 
//       qtdade: 10
//     });

//     itemDoPedidoId = itemDoPedidoParaAtualizar.id;
//   });

//   afterAll(async () => {
//     await ItemDoPedido.destroy({ where: { id: [itemDoPedidoId, itemDoPedidoExistenteId] } });
//   });

//   it("Deve atualizar um item do pedido com sucesso", async () => {
//     const itemDoPedidoAtualizado = {
//       id_pedido: 112, 
//       id_produto: 111, 
//       qtdade: 30
//     };

//     const response = await request(app).put(`/atualizarItemDoPedido/${itemDoPedidoId}`).send(itemDoPedidoAtualizado);

//     expect(response.status).toBe(200);
//     expect(response.body.id_pedido).toBe(itemDoPedidoAtualizado.id_pedido);
//     expect(response.body.id_produto).toBe(itemDoPedidoAtualizado.id_produto);
//     expect(response.body.qtdade).toBe(itemDoPedidoAtualizado.qtdade);
//   });

//   it("Deve retornar erro ao tentar atualizar pedido inexistente", async () => {
//     const itemDoPedidoInexistenteId = 10000000;
//     const itemDoPedidoAtualizado = {
//       id_pedido: 112, 
//       id_produto: 111, 
//       qtdade: 30
//     };

//     const response = await request(app).put(`/atualizarPedido/${itemDoPedidoInexistenteId}`).send(itemDoPedidoAtualizado);

//     expect(response.status).toBe(404);
//     expect(response.body).toHaveProperty("message", "Item do Pedido não encontrado");
//   });
// });

describe("Teste da Rota excluirItemDoPedido", () => {
  let pedidoId: number;
  let produtoId: number;

  beforeAll(async () => {
    const itemDoPedido = await ItemDoPedido.create({
      id: 99,
      id_pedido: pedidoId, 
      id_produto: produtoId, 
      qtdade: 10
    });
  });
  
  afterAll(async () => {
    await ItemDoPedido.destroy({ where: { id: 99 } });
  });

  it("Deve excluir um produto existente", async () => {
    const response = await request(app).delete("/excluirItemDoPedido/99");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Item do Pedido excluído com sucesso");

    const itemdopedidoExcluido = await ItemDoPedido.findByPk(99);
    expect(itemdopedidoExcluido).toBeNull(); 
  });
});