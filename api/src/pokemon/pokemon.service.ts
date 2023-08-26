import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import axios from 'axios';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
	constructor(private prisma: PrismaService) {}
	async create(createPokemonDto: CreatePokemonDto, userId: string) {
		const { pokemonName, nickName } = createPokemonDto;
		const pokemon: any = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
		);
		if (pokemon.status !== 200) {
			throw new Error('Pokemon not found');
		}
		const { name, id, sprites, types } = pokemon.data;
		try {
			const newPokemon = await this.prisma.pokemon.create({
				data: {
					name,
					nickName,
					userId,
					order: id,
					image: sprites.front_default,
				},
			});
			await types.map(async (type) => {
				await this.prisma.pokemonType.create({
					data: {
						name: type.type.name,
						pokemonId: newPokemon.id,
					},
				});
			});

			return {
				message: 'Pokemon created successfully',
			};
		} catch (e) {
			throw new Error(e.message);
		}
	}

	async update(
		id: string,
		updatePokemonDto: UpdatePokemonDto,
		userId: string,
	) {
		const { nickName } = updatePokemonDto;
		try {
			const updatedPokemon = await this.prisma.pokemon.update({
				where: {
					id,
					userId,
				},
				data: {
					nickName,
				},
			});
			if (!updatedPokemon)
				throw new NotFoundException('Pokemon not found');
			return {
				message: 'Pokemon updated successfully',
			};
		} catch (e) {
			throw new NotFoundException('Pokemon not found');
		}
	}

	async findAll(userId: string) {
		try {
			const pokemons = await this.prisma.pokemon.findMany({
				where: {
					userId,
				},
				orderBy: {
					order: 'asc',
				},
				include: {
					types: true,
				},
			});
			return pokemons;
		} catch (e) {
			throw new Error('No pokemon found');
		}
	}

	async remove(id: string, userId: string) {
		try {
			console.log(id);
			const deletedPokemon = await this.prisma.pokemon.delete({
				where: {
					id,
					userId,
				},
			});
			if (deletedPokemon)
				return {
					message: `Pokemon ${deletedPokemon.name} deleted successfully`,
				};
		} catch (e) {
			console.log(e.message);
			throw new NotFoundException('Pokemon not found');
		}
	}
}
