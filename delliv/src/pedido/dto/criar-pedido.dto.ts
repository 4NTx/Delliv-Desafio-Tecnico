import { IsString, IsEnum, Length, IsOptional } from 'class-validator';
import { StatusPedido } from './status-pedido.enum';

export class CriarPedidoDTO {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nomeCliente?: string;

  @IsString()
  @Length(1, 500)
  item: string;

  @IsString()
  @Length(1, 500)
  enderecoEntrega: string;

  @IsOptional()
  @IsEnum(StatusPedido)
  status?: StatusPedido;
}
