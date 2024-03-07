import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import {PrismaService} from "../prisma/prisma.service";
import { ErrorsEnum } from "../../common/errors"

@Injectable()
export class PositionService {
  constructor(private prismaService: PrismaService) {}

  async getPositions() {
    const positions = await this.prismaService.position.findMany();
    if(!positions.length) {
      throw new HttpException({error: ErrorsEnum.positionsNotFound}, HttpStatus.NOT_FOUND)
    }

    return positions
  }
}
