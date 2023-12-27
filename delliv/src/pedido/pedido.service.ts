import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CriarPedidoDTO } from './dto/criar-pedido.dto';
import { AtualizarPedidoDTO } from './dto/atualizar-pedido.dto';
import { StatusPedido } from '@prisma/client';

@Injectable()
export class PedidoService {
  constructor(private prisma: PrismaService) {}

  async criarPedido(criarPedidoDTO: CriarPedidoDTO, usuarioId: number) {
    try {
      const status = criarPedidoDTO.status || StatusPedido.PROCESSANDO;

      const pedidoData = {
        usuario: {
          connect: { id: usuarioId },
        },
        nomeCliente: criarPedidoDTO.nomeCliente,
        item: criarPedidoDTO.item,
        enderecoEntrega: criarPedidoDTO.enderecoEntrega,
        status,
      };

      return await this.prisma.pedido.create({ data: pedidoData });
    } catch (error) {
      throw new BadRequestException('Erro na criação do pedido');
    }
  }

  async verificarDonoPedido(usuarioId, pedidoId) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id: pedidoId },
    });
    return pedido && pedido.usuarioId === usuarioId;
  }

  async buscarTodosPedidos() {
    return this.prisma.pedido.findMany();
  }
  async buscarTodosPedidosDoUsuario(usuarioId) {
    return this.prisma.pedido.findMany({
      where: {
        usuarioId: usuarioId,
      },
    });
  }

  async buscarPedidoPorID(id: number) {
    return this.prisma.pedido.findUnique({ where: { id } });
  }

  async buscarUltimoPedidoDoUsuario(id) {
    return this.prisma.pedido.findFirst({
      where: {
        usuarioId: id,
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  async atualizarPedidoDoUsuario(
    id: number,
    atualizarPedidoDTO: AtualizarPedidoDTO,
  ) {
    try {
      const pedido = await this.prisma.pedido.update({
        where: { id },
        data: atualizarPedidoDTO,
      });

      return pedido;
    } catch (error) {
      throw new NotFoundException(`Pedido não encontrado: ${id}`);
    }
  }
}
