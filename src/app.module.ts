import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module.js';

@Module({
  imports: [
    //Para servir archivos estáticos (Generalmente en public) Con esto podemos desplegar aplicaciones de React,Agunlar, etc
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    //Crear la referenciaa nuestra base de datos. Solo hay 1 forRoot para la raiz y luego tenemos for feature
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
    CommonModule,
  ],
})
export class AppModule {}
