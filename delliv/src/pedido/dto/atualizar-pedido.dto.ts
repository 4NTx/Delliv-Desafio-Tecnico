import { IsOptional, IsString, IsEnum, Length } from 'class-validator';
import { StatusPedido } from './status-pedido.enum';

export class AtualizarPedidoDTO {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nomeCliente?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  item?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  enderecoEntrega?: string;

  @IsOptional()
  @IsEnum(StatusPedido)
  status?: StatusPedido;
}
