import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable() //pode ser injetada em outras classes
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        //objeto responsável por implementar a injeção de dependências
        private postagemRepository: Repository<Postagem>
    ) {}

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }
}