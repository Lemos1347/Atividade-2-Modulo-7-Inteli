import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { Roles } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	// @Roles(Role.Admin)
	@Patch('set/:id')
	async setAdmin(@Param('id') id: string) {
		return await this.adminService.setAdmin(id);
	}

	@Roles(Role.Admin)
	@Patch('remove/:id')
	async removeAdmin(@Param('id') id: string) {
		return await this.adminService.removeAdmin(id);
	}

	@Roles(Role.Admin)
	@Get('all')
	async findAll() {
		return await this.adminService.findAll();
	}

	@Roles(Role.Admin)
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.adminService.findOneById(id);
	}

	@Roles(Role.Admin)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateAdminDto: UpdateAdminDto,
	) {
		return await this.adminService.updateById(id, updateAdminDto);
	}

	@Roles(Role.Admin)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.adminService.removeById(id);
	}
}
