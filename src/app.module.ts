import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module.js';
import { SeedModule } from './seed/seed.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config.js';
import { JoiValidationSchema } from './config/joi.validation.js';

@Module({
  imports: [
    //Para variables de entorno. Si lo pongo abajo no va a correr la aplicacion xq el Config Module configura las variables de entorno. Este es el que procesa y valida mis variables de entorno. Por ende tengo que usar este servicio para todo lo relacionado con variables de entorno
    ConfigModule.forRoot({
      //Estos 2 pueden trabajar en conjunto
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    //Para servir archivos estáticos (Generalmente en public) Con esto podemos desplegar aplicaciones de React,Agunlar, etc
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    //Crear la referenciaa nuestra base de datos. Solo hay 1 forRoot para la raiz y luego tenemos for feature
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb'),
        dbName: 'pokemonsdb',
      }),
    }),

    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
