import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async criarUsuario(criarUsuarioDTO: CriarUsuarioDTO) {
    try {
      const senhaCriptografada = bcrypt.hashSync(criarUsuarioDTO.senha, 12);
      return await this.prisma.usuario.create({
        data: {
          nome: criarUsuarioDTO.nome,
          email: criarUsuarioDTO.email,
          senha: senhaCriptografada,
          cargo: criarUsuarioDTO.cargo,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email já está em uso');
      }
      switch (error.code) {
        case 'P2001':
          throw new BadRequestException('Dados obrigatórios não fornecidos');
        default:
          throw new InternalServerErrorException(
            'Erro ao criar usuário, verifique os dados fornecidos.',
          );
      }
    }
  }

  async buscarPorID(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async buscarPorEmail(email: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }
    return usuario;
  }

  async atualizarUsuario(id: number, atualizarUsuarioDTO: AtualizarUsuarioDTO) {
    try {
      let informacoesAtualizadas = { ...atualizarUsuarioDTO };
      if (atualizarUsuarioDTO.senha) {
        informacoesAtualizadas.senha = bcrypt.hashSync(
          atualizarUsuarioDTO.senha,
          12,
        );
      }
      return await this.prisma.usuario.update({
        where: { id },
        data: informacoesAtualizadas,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Este email já está em uso');
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
      throw error;
    }
  }
}
