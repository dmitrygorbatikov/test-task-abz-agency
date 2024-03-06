import { Controller, HttpCode, HttpStatus, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
  constructor() {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return {}
  }
}
