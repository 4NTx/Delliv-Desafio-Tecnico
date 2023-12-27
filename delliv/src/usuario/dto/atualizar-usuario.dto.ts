import { IsOptional, IsString, IsEmail, Length, IsEnum } from 'class-validator';
import { CargoUsuario } from './cargo-usuario.enum';

export class AtualizarUsuarioDTO {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Length(6, 100)
  senha?: string;

  @IsEnum(CargoUsuario)
  cargo: CargoUsuario;
}
