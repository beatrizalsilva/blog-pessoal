import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  compararSenha: any;
  async criptografarSenha(senha: string): Promise<string> {
    // saltos (salt) são a quantidade de numero de caracteres aleatórios que serão inseridos na senha
    let saltos: number = 10;
    return await bcrypt.hash(senha, saltos);
  }

  async compararSenhas(
    senhaBanco: string,
    senhaDigitada: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(senhaDigitada, senhaBanco);
  }
}
