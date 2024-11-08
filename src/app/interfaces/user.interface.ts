import { Roles } from "../shared/roles";

export interface User {
    name: string;
    lastName: string;
    identityDocument: string;
    phone: string;
    email: string;
    password: string;
    birthDate: string;
}

export interface UserLogin extends Pick<User, 'email' | 'password'>{

}

export interface UserLoginResponse {
    jwt: string;
}

export interface TokenPayload{
    email?: string;
    authorities: Roles;
    sub: string;
    iat: number;
    exp: number;
}