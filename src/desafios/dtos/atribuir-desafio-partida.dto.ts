import { IsNotEmpty } from 'class-validator';
import {Jogador} from "../../jogadores/interfaces/jogador.inteface";
import {Resultado} from "../interfaces/desafios.interface";


export class AtribuirDesafioPartidaDto {
	
	@IsNotEmpty()
	def: Jogador
	
	@IsNotEmpty()
	resultado: Array<Resultado>
	
}
