import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DesafiosSchema} from "./interfaces/desafios.schema";
import {PartidaSchema} from "./interfaces/partida.schema";
import {JogadoresModule} from "../jogadores/jogadores.module";
import {CategoriasModule} from "../categorias/categorias.module";

@Module({
  imports: [MongooseModule.forFeature(
[{name: 'Desafios', schema: DesafiosSchema},
        {name: 'Partida', schema: PartidaSchema}]),
  JogadoresModule,
  CategoriasModule],
  controllers: [DesafiosController],
  providers: [DesafiosService]
})
export class DesafiosModule {}
