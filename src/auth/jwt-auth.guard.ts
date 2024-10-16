import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: "User is not authorized"})
            }

            const user = this.jwtService.verify(token); //user data in encoded in the token payload
            req.user = user;
            return true
        } catch (e) {
            throw new UnauthorizedException({message: "Unauthorized user"});
        }
    }
}