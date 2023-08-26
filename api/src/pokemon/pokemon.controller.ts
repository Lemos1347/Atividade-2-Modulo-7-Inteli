import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Request,
	InternalServerErrorException,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Roles } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { RequestUserDto } from 'src/user/dto/request-user.dto';

@Controller('pokemon')
export class PokemonController {
	constructor(private readonly pokemonService: PokemonService) {}

	@Roles(Role.User)
	@Post('create')
	async create(
		@Body() createPokemonDto: CreatePokemonDto,
		@Request() req: RequestUserDto,
	) {
		try {
			return await this.pokemonService.create(
				createPokemonDto,
				req.user.id,
			);
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	@Roles(Role.User)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updatePokemonDto: UpdatePokemonDto,
		@Request() req: RequestUserDto,
	) {
		try {
			return await this.pokemonService.update(
				id,
				updatePokemonDto,
				req.user.id,
			);
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	@Roles(Role.User)
	@Get()
	async findAll(@Request() req: RequestUserDto) {
		return await this.pokemonService.findAll(req.user.id);
	}

	@Roles(Role.User)
	@Delete(':id')
	async remove(@Param('id') id: string, @Request() req: RequestUserDto) {
		return await this.pokemonService.remove(id, req.user.id);
	}
}
