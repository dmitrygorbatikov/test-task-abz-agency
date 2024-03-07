import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';
import { GetTokenListDto } from './dto/get-token-list.dto';
import { Token } from '@prisma/client';
import {PrismaService} from "../prisma/prisma.service";
import { ErrorsEnum } from "../../common/errors"

@Injectable()
export class TokenService {
  constructor(private prismaService: PrismaService) {}
  async createToken(data: any) {
    try {
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
    catch (e) {
      throw new HttpException({error: e.message}, HttpStatus.BAD_REQUEST)
    }
  }

  async getTokenList(props: GetTokenListDto){
    try {
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
    catch (e) {
      throw new HttpException({error: e.message}, HttpStatus.BAD_REQUEST)
    }
  }

  async getTokenById(id: number) {
    try {
      return this.prismaService.token.findUnique({ where: { id } });
    }
    catch (e) {
      throw new HttpException({error: e.message}, HttpStatus.BAD_REQUEST)
    }
  }

  async verifyToken(id: number) {
    try {
      const token = await this.prismaService.token.findUnique({
        where: { id },
      });

      if (!token.is_valid) {
        throw new HttpException(
          { error: ErrorsEnum.tokenUsed },
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
    } catch (e) {
      throw new HttpException(
        { error: e.message }, HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateToken(token: Token) {
    try {
      jwt.verify(token.value, process.env.JWT_SECRET);
    } catch (e) {
      await this.prismaService.token.update({
        data: {
          is_valid: false,
        },
        where: { id: token.id },
      });
    }
  }

  async checkTokenValidation() {
    try {
      const validTokens = await this.prismaService.token.findMany({ where: { is_valid: true } });
      await Promise.all(
        validTokens.map(async (token) => {
          return await this.validateToken(token);
        }),
      );

      console.log('Token check complete.');
    }
    catch (e) {
      console.error(e.message)
    }
  }
}
