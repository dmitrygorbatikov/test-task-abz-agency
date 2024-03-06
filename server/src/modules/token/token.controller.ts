import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TokenService } from './token.service';
import { GetTokenListDto } from './dto/get-token-list.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}
  @Get()
  public async getTokenList(@Query() query: GetTokenListDto) {
    return this.tokenService.getTokenList(query);
  }
  @Get('/:id')
  public async getTokenById(@Param('id') id: string) {
    return this.tokenService.getTokenById(+id);
  }

  @Post()
  public async createToken(@Body() body: any) {
    return this.tokenService.createToken(body);
  }

  @Get('/verify/:id')
  public async verifyToken(@Param('id') id: string) {
    return this.tokenService.verifyToken(+id);
  }
  @Cron(CronExpression.EVERY_MINUTE)
  async validateTokens() {
    const validTokens = await this.tokenService.getAllValidTokens();

    await Promise.all(
      validTokens.map(async (token) => {
        return await this.tokenService.validateToken(token);
      }),
    );

    console.log('Token check complete.');
  }
}
