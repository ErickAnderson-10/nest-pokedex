//Este es todo el esquema de moongose con nestjs
//Básicamente la representación de lo que nosotros estaremos grabando en la base de datos. Se ve como una tabla
//Mongo es nuy compatible con nest, trabajan bien juntos
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//Para que esto sea considerado un documento en mi coleccion de pokemons, (mongose se encargará de ponerle la s), tengo que ponerle un extends Document(este le añade todas las funcionalidades respectivas como nombres, métodos, etc)
@Schema() //Para indicar que este es un esquema de bd
export class Pokemon extends Document {
  //id: string //Mongo me lo da
  @Prop({
    unique: true,
    index: true, //Es como el índice de los libros. Como están indexados, buscarlo por nombre como por no es igual de rápido
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
