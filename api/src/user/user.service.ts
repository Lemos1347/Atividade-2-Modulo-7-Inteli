import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateReturn } from './interfaces/createReturn.interface';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto): Promise<null | CreateReturn> {
		const userExists = await this.prisma.user.findUnique({
			where: {
				email: createUserDto.email,
			},
		});
		if (userExists) return null;
		try {
			const hashedPassword = await bcrypt.hash(createUserDto.password, 8);
			createUserDto.password = hashedPassword;
			const user = await this.prisma.user.create({ data: createUserDto });
			return {
				message: `User ${user.name} created successfully`,
			};
		} catch (e) {
			throw new Error(`Error creating user: ${e.message}`);
		}
	}

	async findOneById(id: string): Promise<User> {
		let user = await this.prisma.user.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		delete user.password;
		return user;
	}

	async findOneByEmail(email: string): Promise<User> {
		let user = await this.prisma.user.findUniqueOrThrow({
			where: {
				email: email,
			},
		});

		return user;
	}

	async findByName(name: string): Promise<User[]> {
		const user = await this.prisma.user.findMany({
			where: {
				name: name,
			},
		});
		return user;
	}

	async updateById(id: string, updateUserDto: UpdateUserDto) {
		await this.findOneById(id);
		let newUser = await this.prisma.user.update({
			where: {
				id: id,
			},
			data: updateUserDto,
		});
		if (newUser)
			return { message: `User ${newUser.name} updated successfully` };
	}

	async removeById(id: string) {
		await this.findOneById(id);
		const deletedUser = await this.prisma.user.delete({
			where: {
				id: id,
			},
		});
		if (deletedUser)
			return { message: `User ${deletedUser.name} deleted successfully` };
	}
}
