import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signInDto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async signIn(
		@Body() signInDto: SignInDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const { access_token } = await this.authService.signIn(
			signInDto.email,
			signInDto.password,
		);
		(response as any).cookie('jwt', access_token);
		return {
			access_token,
			message: "User's logged in successfully!",
		};
	}
}
