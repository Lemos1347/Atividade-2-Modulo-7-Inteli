import { $Enums } from '@prisma/client';

export class User {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	roles: $Enums.Role[];
}
