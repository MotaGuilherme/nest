import {Body, Controller, Delete, Get, Post, Query, Param, UsePipes, Put, ValidationPipe} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { JogadoresService } from "./jogadores.service";
import { Jogador } from "./interfaces/jogador.inteface";
import { JogadoresValidaOParametrosPipe } from '../common/pipes/validação-parametros.pipe'
import {AtualiazarJogadorDto} from "./dtos/atualiazar-jogador.dto";

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {
    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto:CriarJogadorDto): Promise<Jogador> {
         return await this.jogadoresService.criarJogador(criarJogadorDto);

    }
    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Param('_id', JogadoresValidaOParametrosPipe) _id: string,
        @Body() atualizarJogadorDto: AtualiazarJogadorDto): Promise<void> {
         await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
    }

    @Get()
    async consultarJogadores(){
        return await this.jogadoresService.consultartodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadoresPeloId(
        @Param('_id', JogadoresValidaOParametrosPipe) _id: string): Promise <Jogador> {
        return await this.jogadoresService.consultarJogadorId(_id);
    }

    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', JogadoresValidaOParametrosPipe) _id: string): Promise<void> {
            await this.jogadoresService.deletarJogador(_id);
    }
}
