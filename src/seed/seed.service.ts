import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface.js';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity.js';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter.js';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) //Se usa esto xq el Model no es una implementacion propia como tal. Sirve para que podamos inyectar modelos en este servicio
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    //Esto va a crear una insercion de muchas entradas, pero con solo 1 insercion. Y esto es lo recomendado para insertar las semillas

    await this.pokemonModel.deleteMany({}); // delete * from pokemons
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=600',
    );
    const pokemonToInsert: { name: string; no: number }[] = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      // const pokemon = await this.pokemonModel.create({ name, no });
      pokemonToInsert.push({ name, no });
    });
    await this.pokemonModel.insertMany(pokemonToInsert);
    //insertMany = insert into pokemons (name,no)
    //[{name:bulbasor, no1}]

    return 'Seed executed';
  }
}
