//Es la data que yo quiero recibir y voy a validar y demás

import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  no: number;

  @MinLength(1)
  @IsString()
  name: string;
}
