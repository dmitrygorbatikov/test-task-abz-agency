import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { User } from '@prisma/client';
import { GetUsersDto } from './dto/get-users.dto';
import { TinifyService } from '../tinify/tinify.service';
import { CreateUserDto } from './dto/create-user-dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private tinifyService: TinifyService,
  ) {}

  async getUsers(query: GetUsersDto): Promise<{
    users: User[];
    totalCount: number;
    page: number;
    perPage: number;
  }> {
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

  async createUser(body: CreateUserDto) {
    const candidate = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });
    if (candidate) {
      throw new HttpException(
        { error: 'User already exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const base64Str = body.photo.replace(/^data:image\/\w+;base64,/, '');
    const bufferImage = Buffer.from(base64Str, 'base64');
    const fileName = uuidv4();
    const imageUrl = await this.tinifyService.saveImage(bufferImage, fileName);

    const position = await this.prismaService.position.findUnique({
      where: { id: body.position_id },
    });
    if (!position) {
      throw new HttpException(
        { error: 'Position not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = {
      ...body,
      position_id: position.id,
      position_name: position.name,
      photo: imageUrl,
    };
    console.log(data);
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

  async getUserById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException(
        { error: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
