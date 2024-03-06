import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';
import { PrismaService } from '../prisma';
import { GetTokenListDto } from './dto/get-token-list.dto';
import { Token } from '@prisma/client';

@Injectable()
export class TokenService {
  constructor(private prismaService: PrismaService) {}
  async createToken(data: any) {
    return this.prismaService.token.create({
      data: {
        value: jwt.sign(
          {
            data,
          },
          process.env.JWT_SECRET,
          { expiresIn: '40m' },
        ),
      },
    });
  }

  async getTokenList(props: GetTokenListDto): Promise<{
    perPage: number;
    page: number;
    totalCount: number;
    tokens: Token[];
  }> {
    const totalCount = await this.prismaService.token.count();

    const skip = props.page
      ? (parseInt(props.page) - 1) *
        (props.perPage ? parseInt(props.perPage) : 20)
      : undefined;
    const take = props.perPage ? parseInt(props.perPage) : 20;

    const tokens = await this.prismaService.token.findMany({
      skip,
      take,
    });

    const page = props.page ? parseInt(props.page) : 1;

    return { tokens, totalCount, page, perPage: take };
  }

  async getTokenById(id: number) {
    return this.prismaService.token.findUnique({ where: { id } });
  }

  async verifyToken(id: number) {
    try {
      const token = await this.prismaService.token.findUnique({
        where: { id },
      });

      if (!token.is_valid) {
        throw new HttpException(
          { error: 'Token already used' },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prismaService.token.update({
        data: {
          is_valid: false,
        },
        where: { id },
      });
      return jwt.verify(token.value, process.env.JWT_SECRET);
    } catch (error) {
      throw new HttpException(
        { error: 'Something went wrong' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateToken(token: Token) {
    try {
      jwt.verify(token.value, process.env.JWT_SECRET);
      console.log('valid');
    } catch (e) {
      console.log(e.message);
      await this.prismaService.token.update({
        data: {
          is_valid: false,
        },
        where: { id: token.id },
      });
    }
  }

  async getAllValidTokens() {
    return this.prismaService.token.findMany({ where: { is_valid: true } });
  }
}
