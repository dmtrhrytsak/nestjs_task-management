import {
  ConflictException,
  Injectable,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtPayload } from './jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const candidate = await this.usersService.findOne(username);

    if (candidate) {
      throw new ConflictException(`Username "${username}" is already in use`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    this.usersService.create(username, hashedPassword);
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return null;
    }

    return user;
  }
}
