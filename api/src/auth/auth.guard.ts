import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enums/roles.enum';
import { ROLES_KEY } from './auth.decorator';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private jwtService: JwtService,
		private prisma: PrismaService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);
		if (!requiredRoles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeaders(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		const { userRoles, id } = await this.extractUserRole(token);
		if (requiredRoles.some((role) => userRoles.includes(role))) {
			request['user'] = { id };
			return true;
		}
		// const { user } = context.switchToHttp().getRequest();
		// return requiredRoles.some((role) => user.roles?.includes(role));
	}

	private extractTokenFromCookies(request: Request): string | undefined {
		const jwt = (request as any).cookies['jwt'];
		return jwt;
	}

	private extractTokenFromHeaders(request: Request): string | undefined {
		const authHeader = (request as any).headers.authorization;
		return authHeader?.split(' ')[1];
	}

	private async extractUserRole(token: string) {
		try {
			const { id } = await this.jwtService.verifyAsync(token, {
				secret: jwtConstants.secret,
			});
			const user = await this.prisma.user.findUniqueOrThrow({
				where: {
					id: id,
				},
			});

			// Create a roles table
			return { userRoles: (user as any).roles, id: id };
		} catch {
			throw new UnauthorizedException();
		}
	}
}
