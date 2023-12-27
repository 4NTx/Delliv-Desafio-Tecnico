import {
  Controller,
  Post,
  Body,
  Param,
  Req,
  Put,
  UseGuards,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { Request } from 'express';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario.dto';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(ThrottlerGuard)
  @Post('registro')
  async registrarUsuario(@Body() criarUsuarioDTO: CriarUsuarioDTO) {
    return this.usuarioService.criarUsuario(criarUsuarioDTO);
  }

  @UseGuards(ThrottlerGuard)
  @Post('login')
  async login(@Body() credenciais: { email: string; senha: string }) {
    const usuario = await this.authService.validarUsuario(
      credenciais.email,
      credenciais.senha,
    );

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.authService.login(usuario);
  }

  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @Get(':id')
  async buscarPorID(@Param('id') id: string) {
    return this.usuarioService.buscarPorID(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('atualizarUsuario/:id')
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() atualizarUsuarioDTO: AtualizarUsuarioDTO,
    @Req() req: Request,
  ) {
    const usuarioAutenticado = req.user as { id: number };

    if (usuarioAutenticado.id !== +id) {
      throw new UnauthorizedException(
        'Não autorizado a atualizar este usuário',
      );
    }

    return this.usuarioService.atualizarUsuario(+id, atualizarUsuarioDTO);
  }
}
