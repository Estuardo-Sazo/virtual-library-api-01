import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: userDto.email });
    if (existingUser) {
      throw new ConflictException(
        'El email ya está registrado, inicia sesión.',
      );
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    const newUser = new this.userModel({
      ...userDto,
      password: hashedPassword,
    });

    newUser.save();
    const payload = { sub: newUser._id, username: newUser.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
      _id: newUser._id,
      username: newUser.username,
    };
  }

  async login(email: string, pass: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
