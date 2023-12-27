import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, senha: string): Promise<any> {
    try {
      const usuario = await this.usuarioService.buscarPorEmail(email);
      if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
        const { senha, ...resultado } = usuario;
        return resultado;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException('Falha na autenticação');
    }
  }

  async login(usuario: any) {
    if (!usuario.id) {
      throw new Error('ID do usuário não está definido');
    }

    const payload: JwtPayload = {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      cargo: usuario.cargo,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registrar(usuario: any) {
    const senhaCriptografada = bcrypt.hashSync(usuario.senha, 12);
    const novoUsuario = await this.usuarioService.criarUsuario({
      ...usuario,
      senha: senhaCriptografada,
    });
    const { senha, ...resultado } = novoUsuario;
    return resultado;
  }

  async validarUsuarioPorJWT(payload: JwtPayload) {
    return this.usuarioService.buscarPorID(payload.sub);
  }
}
