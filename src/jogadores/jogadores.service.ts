import {Injectable, Logger, NotFoundException, } from '@nestjs/common';
import {CriarJogadorDto} from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.inteface";
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class JogadoresService {


    constructor(@InjectModel('jogadores') private readonly jogadorModel: Model<Jogador>) {
    }


    async consultartodosJogadores():Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async criarAtualizarJogador(criarJogadodto: CriarJogadorDto): Promise<void> {

        const { email } = criarJogadodto;

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado) {
            this.atualizar(jogadorEncontrado)
        } else {
            this.criar(criarJogadodto);

        }

    }

    async consultarJogadoresEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com o email ${email} não foi encontrado`);
        }
        return jogadorEncontrado;
    }

    async deletarJogador(email): Promise<void> {

        return await this.jogadorModel.remove({email}).exec()
    }
    private async criar(criarJogadodto: CriarJogadorDto): Promise<Jogador>{

        const jogadorCriado = new this.jogadorModel(criarJogadodto);
        return await jogadorCriado.save();


    }

    private async atualizar(criarjogadorDto: CriarJogadorDto): Promise<Jogador> {

        return await this.jogadorModel.findOneAndUpdate({email: criarjogadorDto.email},
            {$set: criarjogadorDto}).exec();

    }


}
