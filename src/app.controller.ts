import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @ApiExcludeEndpoint()
  @Get()
  // receberá a resposta da requisição Get
  async redirect(@Res() resposta: any) {
    return resposta.redirect('/swagger');
    // o redirect redireciona a requisição para o endpoint do Swagger
  }
}
