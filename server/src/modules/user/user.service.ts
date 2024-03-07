import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUsersDto } from './dto/get-users.dto';
import { TinifyService } from '../tinify/tinify.service';
import { CreateUserDto } from './dto/create-user-dto';
import { v4 as uuidv4 } from 'uuid';
import {PrismaService} from "../prisma/prisma.service";
import { ErrorsEnum } from "../../common/errors"

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private tinifyService: TinifyService,
  ) {}

  async getUsers(query: GetUsersDto){
    try {
      const whereCondition: any = {};

      if (query.q) {
        whereCondition.OR = [
          { name: { contains: query.q, mode: 'insensitive' } },
          { email: { contains: query.q, mode: 'insensitive' } },
          { position_name: { contains: query.q, mode: 'insensitive' } },
          { phone: { contains: query.q, mode: 'insensitive' } },
        ];
      }

      const orderBy: any = {};
      if (query.sortBy && query.sortItem) {
        orderBy[query.sortItem] =
          query.sortBy.toLowerCase() === 'asc' ? 'asc' : 'desc';
      }

      const totalCount = await this.prismaService.user.count({
        where: whereCondition,
      });

      const skip = query.page
        ? (parseInt(query.page) - 1) *
        (query.perPage ? parseInt(query.perPage) : 10)
        : undefined;
      const take = query.perPage ? parseInt(query.perPage) : 10;
      const users = await this.prismaService.user.findMany({
        where: whereCondition,
        orderBy,
        skip,
        take,
      });

      const page = query.page ? parseInt(query.page) : 1;

      return { users, totalCount, page, perPage: take };
    }
    catch (e) {
      throw new HttpException({error: e.message}, HttpStatus.BAD_REQUEST)
    }
  }

  async createUser(body: CreateUserDto) {
    try {
      const candidate = await this.prismaService.user.findUnique({
        where: { email: body.email },
      });
      if (candidate) {
        throw new HttpException(
          { error: ErrorsEnum.userExist },
          HttpStatus.BAD_REQUEST,
        );
      }
      const imageUrl = await this.tinifyService.getImageUrl(body.photo);

      const position = await this.prismaService.position.findUnique({
        where: { id: body.position_id },
      });
      if (!position) {
        throw new HttpException(
          { error: 'Position not found' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.prismaService.user.create({
        data: {
          ...body,
          position_id: position.id,
          position_name: position.name,
          photo: imageUrl,
        },
      });
      return { user };
    }
    catch (e) {
      throw new HttpException({error: e.message}, HttpStatus.BAD_REQUEST)
    }
  }

  async getUserById(userId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new HttpException(
          { error: ErrorsEnum.userNotFound },
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    }
    catch (e) {
      throw new HttpException({error: e.message}, HttpStatus.BAD_REQUEST)
    }
  }
}
