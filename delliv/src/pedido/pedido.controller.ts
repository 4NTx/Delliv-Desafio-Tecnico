import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { PedidoService } from './pedido.service';
import { CriarPedidoDTO } from './dto/criar-pedido.dto';
import { AtualizarPedidoDTO } from './dto/atualizar-pedido.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @Post('criarPedido')
  async criarPedido(
    @Body() criarPedidoDTO: CriarPedidoDTO,
    @Req() req: Request,
  ) {
    const usuarioAutenticado = req.user as { id: number; nome: string };
    if (!criarPedidoDTO.nomeCliente) {
      criarPedidoDTO.nomeCliente = usuarioAutenticado.nome;
    }
    return this.pedidoService.criarPedido(
      criarPedidoDTO,
      usuarioAutenticado.id,
    );
  }

  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @Get('buscarTodosPedidos')
  async buscarTodosPedidosDoUsuario(@Req() req: Request) {
    const usuarioAutenticado = req.user as { id: number };
    return this.pedidoService.buscarTodosPedidosDoUsuario(
      usuarioAutenticado.id,
    );
  }

  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @Get('buscarPedidoPorID/:id')
  async buscarPedidoPorID(@Param('id') id: string, @Req() req: Request) {
    const usuarioAutenticado = req.user as { id: number };
    const temPermissao = await this.pedidoService.verificarDonoPedido(
      usuarioAutenticado.id,
      +id,
    );
    if (!temPermissao) {
      throw new ForbiddenException('Acesso negado ao pedido solicitado');
    }

    return this.pedidoService.buscarPedidoPorID(+id);
  }

  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @Put('atualizarPedido/:id')
  async atualizarPedidoDoUsuario(
    @Param('id') id: string,
    @Body() atualizarPedidoDTO: AtualizarPedidoDTO,
    @Req() req: Request,
  ) {
    const usuarioAutenticado = req.user as { id: number };
    const temPermissao = await this.pedidoService.verificarDonoPedido(
      usuarioAutenticado.id,
      +id,
    );

    if (!temPermissao) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar este pedido',
      );
    }
    return this.pedidoService.atualizarPedidoDoUsuario(+id, atualizarPedidoDTO);
  }
}
