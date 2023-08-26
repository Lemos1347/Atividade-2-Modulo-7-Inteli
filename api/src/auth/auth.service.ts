import {
	Injectable,
	UnauthorizedException,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, pass: string): Promise<any> {
		let user;

		try {
			user = await this.userService.findOneByEmail(email);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.NOT_FOUND);
		}
		if (!(await bcrypt.compare(pass, user.password))) {
			throw new UnauthorizedException();
		}
		const payload = {
			id: user.id,
		};

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
