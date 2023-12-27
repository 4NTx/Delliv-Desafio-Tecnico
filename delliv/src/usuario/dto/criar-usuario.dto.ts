import { IsString, IsEmail, Length, IsEnum } from 'class-validator';
import { CargoUsuario } from './cargo-usuario.enum';

export class CriarUsuarioDTO {
  @IsString()
  @Length(1, 500)
  nome: string;

  @IsEmail()
  email: string;

  @Length(6, 100)
  senha: string;

  @IsEnum(CargoUsuario)
  cargo: CargoUsuario;
}
