import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { userRole } from "src/common/enums";
import { GenericService } from "src/utils/generic-service.utill";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signup.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {
    super(usersRepository);
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { password, email,role, license_num } = signUpDto;

    if (await this.usersRepository.findOne({ where: { email } })) {
      throw new HttpException(
        "user with email already exist",
        HttpStatus.BAD_REQUEST
      );
    }

    if(role === userRole.LAWYER && !license_num || license_num?.trim() === ""){
      throw new HttpException(
        "Missing License number for Lawyer",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.save({
      ...signUpDto,
      password: hashedPassword,
    });
    
    const token = this.jwtService.sign({ id: user?.id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; user: User }> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const token = this.jwtService.sign({ id: user.id });
    delete user["password"];

    return { token, user };
  }
}
