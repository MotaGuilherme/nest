import { IsNotEmpty } from 'class-validator'

export class AtualiazarJogadorDto {
	
	@IsNotEmpty()
	readonly celular: string;
	
	@IsNotEmpty()
	readonly nome: string;
}
