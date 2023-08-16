import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Patch,
	Post,
	Request,
} from '@nestjs/common';
import { Roles } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestUserDto } from './dto/request-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('create')
	async create(@Body() createUserDto: CreateUserDto) {
		try {
			const response = await this.userService.create(createUserDto);
			if (response) return response;
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
		throw new ConflictException('User already exists with this email');
	}

	@Roles(Role.User)
	@Get('/')
	async findOne(@Request() req: RequestUserDto) {
		try {
			const res = await this.userService.findOneById(req.user.id);
			return res;
		} catch (err) {
			if (err.name == 'NotFoundError') {
				throw new NotFoundException('User not found');
			}
			throw new InternalServerErrorException(err.message);
		}
	}

	@Roles(Role.User)
	@Patch('id')
	async update(
		@Request() req: RequestUserDto,
		@Body() updateUserDto: UpdateUserDto,
	) {
		if (!updateUserDto) throw new BadRequestException('Nothing to update');
		try {
			return await this.userService.updateById(
				req.user.id,
				updateUserDto,
			);
		} catch (err) {
			if (err.name == 'NotFoundError') {
				throw new NotFoundException('User not found to be updated!');
			}
			throw new InternalServerErrorException(err.message);
		}
	}

	@Roles(Role.User)
	@Delete('id')
	async remove(@Request() req: RequestUserDto) {
		try {
			return await this.userService.removeById(req.user.id);
		} catch (err) {
			if (err.name == 'NotFoundError') {
				throw new NotFoundException('User not found to be updated!');
			}
			throw new InternalServerErrorException(err.message);
		}
	}
}
