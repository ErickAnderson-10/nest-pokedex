import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto.js';
//UpdatePokemonDto va a tener todas las propiedades con las mismas condiciones que createPokemonDto pero siendo todas sus propiedades opcionales
//Al actualizar mi create, tambien tengo pre-actualizado mi update
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
