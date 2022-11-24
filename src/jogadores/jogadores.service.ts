import {BadRequestException, Injectable, Logger, NotFoundException,} from '@nestjs/common';
import {CriarJogadorDto} from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.inteface";
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import {AtualiazarJogadorDto} from "./dtos/atualiazar-jogador.dto";

@Injectable()
export class JogadoresService {


    constructor(@InjectModel('jogadores') private readonly jogadorModel: Model<Jogador>) {
    }


    async consultartodosJogadores():Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async criarJogador(criarJogadodto: CriarJogadorDto): Promise<Jogador> {

        const { email } = criarJogadodto;

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado) throw new BadRequestException(`Jogador com o email ${email} já cadastrado!`);
        
        const jogadorCriado = new this.jogadorModel(criarJogadodto);
        return await jogadorCriado.save();
    }
    async atualizarJogador(_id: string, atualizarJogadorDto: AtualiazarJogadorDto): Promise<void> {
        
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com o id ${_id} não encontrado!`)
        }

        await this.jogadorModel.findOneAndUpdate({_id},
            {$set: atualizarJogadorDto}).exec();
        
    }

    async consultarJogadorId(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com o id ${_id} não foi encontrado`);
        }
        return jogadorEncontrado;
    }

    async deletarJogador(_id): Promise<any> {
    
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com o id ${_id} não foi encontrado`);
        }
        
        return await this.jogadorModel.deleteOne({_id}).exec()
    }

}
