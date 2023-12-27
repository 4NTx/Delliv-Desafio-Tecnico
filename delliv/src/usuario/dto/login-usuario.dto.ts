import { IsEmail, Length } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail()
  email: string;

  @Length(6, 100)
  senha: string;
}
