import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import {model, Model} from "mongoose";
import { Categoria } from "./interfaces/categoria.interface";
import { CriarCategoriaDto } from "./dtos/criar-categoria.dto";
import { AtualizarCategoriaDto } from "./dtos/atualizar-categoria.dto";
import { Jogador } from "../jogadores/interfaces/jogador.inteface";
import {JogadoresService} from "../jogadores/jogadores.service";

@Injectable()
export class CategoriasService {
	
	constructor(
		@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
		private readonly jogadoresService: JogadoresService
	) {
	}
	
	async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
		
		const {categoria} = criarCategoriaDto
		
		const categoriaEcontrada = await this.categoriaModel.findOne({ categoria }).exec()
		
		if (categoriaEcontrada) {
			throw new BadRequestException(`Categoria ${categoria} já cadastrada!`)
		}
		
		const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
		return await categoriaCriada.save()
		
	}
	
	async consultarTodasCategorias(): Promise<Array<Categoria>> {
		return await this.categoriaModel.find().populate( "jogadores").exec();
		
	}
	
	async consultarCategoria(categoria: string): Promise<Categoria> {
		
		const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()
		
		if (!categoriaEncontrada) {
			throw new NotFoundException(`A categoria que voce informou nao foi encotrada`)
		}
		return categoriaEncontrada;
		
		
	}
	
	async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
		
		const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
		
		if (!categoriaEncontrada) {
			throw new NotFoundException('A categoria que voce informou nao foi encontrada')
		}
		
		await this.categoriaModel.findOneAndUpdate({categoria},
			{$set: atualizarCategoriaDto}).exec();
		
	}
	
	async atribuirCategoriaJogador(params: string[]): Promise<void> {
		
		const categoria = params['categoria'];
		const idJogador = params['idJogador'];
		
		
		const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
		
		const jogadorJaCadastrado = await this.categoriaModel.find({categoria})
			.where('jogadores').in(idJogador).exec()
		
		await this.jogadoresService.consultarJogadorId(idJogador);
		
		if (!categoriaEncontrada){
			throw new BadRequestException(`Categoria não cadastrada!`);
		}
		
		if (jogadorJaCadastrado.length > 0 ) {
			throw  new BadRequestException(`O jogador já está cadastrado na categoria: ${categoria}!`)
		}
		
		categoriaEncontrada.jogadores.push(idJogador)
		await this.categoriaModel.findOneAndUpdate({ categoria },
			{ $set: categoriaEncontrada}).exec();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
