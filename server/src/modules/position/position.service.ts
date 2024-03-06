import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class PositionService {
  constructor(private prismaService: PrismaService) {}

  async getPositions() {
    return this.prismaService.position.findMany();
  }
}
