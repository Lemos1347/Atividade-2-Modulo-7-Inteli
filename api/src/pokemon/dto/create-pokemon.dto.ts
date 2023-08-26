import { IsNotEmpty } from 'class-validator';

export class CreatePokemonDto {
	@IsNotEmpty()
	pokemonName: string;
	@IsNotEmpty()
	nickName: string;
}
