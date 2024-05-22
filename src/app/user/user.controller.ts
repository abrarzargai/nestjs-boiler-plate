import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATIONS } from 'src/common/constants/api-operation-details';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiOperation(API_OPERATIONS.USER.SIGNUP) 
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('/login')
  @ApiOperation(API_OPERATIONS.USER.LOGIN) 
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.userService.login(loginDto);
  }
}
