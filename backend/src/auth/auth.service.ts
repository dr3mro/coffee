import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        if (username === 'admin' && pass === 'admin123') {
            const { ...result } = { userId: 1, username: 'admin' };
            return result;
        }
        return null;
    }

    async login(user: any) {
        if (user.username !== 'admin' || user.password !== 'admin123') {
            throw new UnauthorizedException();
        }
        const payload = { username: user.username, sub: 1 };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
