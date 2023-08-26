import { IsNotEmpty } from 'class-validator';

export class UpdatePokemonDto {
	@IsNotEmpty()
	nickName: string;
}
