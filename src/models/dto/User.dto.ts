export class UserDTO {
    id!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    createdAt!: string;
    updatedAt!: string;
}

export class UserCreateDTO {
    email!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
}

export class UserUpdateDTO {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}
