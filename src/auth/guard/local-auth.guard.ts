import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// classe usada para redirecionar as requisições de login para o DB
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}