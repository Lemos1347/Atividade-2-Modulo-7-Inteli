import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/admin.entity';

@Injectable()
export class AdminService {
	constructor(private prisma: PrismaService) {}

	async setAdmin(id: string) {
		const user = await this.prisma.user.findUniqueOrThrow({
			where: {
				id: id,
			},
		});

		return await this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				roles: [...user.roles, 'ADMIN'],
			},
		});
	}

	async removeAdmin(id: string) {
		const user = await this.prisma.user.findUniqueOrThrow({
			where: {
				id: id,
			},
		});

		if (user.roles.includes('ADMIN') === false)
			throw new Error('User is not an admin');

		const updatedRoles = user.roles.filter((role) => role !== 'ADMIN');

		return await this.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				roles: [...updatedRoles],
			},
		});
	}

	async findAll(): Promise<User[]> {
		const users = await this.prisma.user.findMany({
			orderBy: {
				id: 'desc',
			},
		});
		if (users.length !== 0) {
			for (let user in users) {
				delete (user as any).password;
			}
		}
		return users;
	}

	async findOneById(id: string): Promise<User> {
		const user = await this.prisma.user.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
		return user;
	}

	async updateById(id: string, updateUserDto: UpdateAdminDto) {
		return await this.prisma.user.update({
			where: {
				id: id,
			},
			data: updateUserDto,
		});
	}

	async removeById(id: string) {
		return await this.prisma.user.delete({
			where: {
				id: id,
			},
		});
	}
}
