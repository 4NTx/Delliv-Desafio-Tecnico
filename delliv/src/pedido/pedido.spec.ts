import { Test, TestingModule } from '@nestjs/testing';
import { PedidoService } from './pedido.service';
import { BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CriarPedidoDTO } from './dto/criar-pedido.dto';
import { StatusPedido } from './dto/status-pedido.enum';
import { Prisma } from '@prisma/client';

describe('PedidoService', () => {
  let service: PedidoService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidoService, PrismaService],
    }).compile();

    service = module.get<PedidoService>(PedidoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a pedido', async () => {
    const criarPedidoDTO: CriarPedidoDTO = {
      nomeCliente: 'Test Client',
      item: 'Test Item',
      enderecoEntrega: 'Test Address',
      status: StatusPedido.PROCESSANDO,
    };

    const usuarioId = 1;

    const pedidoData: Prisma.PedidoCreateInput = {
      usuario: {
        connect: { id: usuarioId },
      },
      nomeCliente: criarPedidoDTO.nomeCliente,
      item: criarPedidoDTO.item,
      enderecoEntrega: criarPedidoDTO.enderecoEntrega,
      status: criarPedidoDTO.status,
    };

    jest.spyOn(prisma.pedido, 'create').mockImplementation(() =>
      Promise.resolve({
        ...pedidoData,
        id: 1,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        usuarioId: usuarioId,
      }),
    );

    const result = await service.criarPedido(criarPedidoDTO, usuarioId);

    expect(result).toBeDefined();
    expect(result).toEqual({
      ...pedidoData,
      id: 1,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
      usuarioId: usuarioId,
    });
    expect(prisma.pedido.create).toHaveBeenCalledWith({ data: pedidoData });
  });

  it('should throw an error when creating a pedido fails', async () => {
    const usuarioId = 1;
    const criarPedidoDTO: CriarPedidoDTO = {
      nomeCliente: 'Test Client',
      item: 'Test Item',
      enderecoEntrega: 'Test Address',
      status: StatusPedido.PROCESSANDO,
    };

    jest
      .spyOn(prisma.pedido, 'create')
      .mockImplementation(() => Promise.reject(new BadRequestException()));

    await expect(
      service.criarPedido(criarPedidoDTO, usuarioId),
    ).rejects.toThrow(BadRequestException);
  });
});
