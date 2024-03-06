import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUsersDto } from './dto/get-users.dto';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getUsers(@Query() query: GetUsersDto) {
    return this.userService.getUsers(query);
  }

  @Post()
  public async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Get('/:userId')
  public async getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(Number(userId));
  }
}
