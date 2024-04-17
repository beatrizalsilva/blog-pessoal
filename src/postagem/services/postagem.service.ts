import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable() //pode ser injetada em outras classes
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        //objeto responsável por implementar a injeção de dependências
        private postagemRepository: Repository<Postagem>
    ) {}

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations: {tema: true}
        });
    }

    async findById(id: number): Promise<Postagem> {
        let postagem = await this.postagemRepository.findOne({
            where: {id},
            relations: {tema: true}
        });
        if(!postagem) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND); //erro 404 = tratamento de erro
        }
        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            //método de busca de texto do mysql, ILike ignora se for maiúscula ou minúscula
            where: { titulo: ILike(`%${titulo}%`)},
            relations: {tema: true}
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {
        let buscaPostagem: Postagem = await this.findById(postagem.id);
        if(!buscaPostagem || !postagem.id) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscaPostagem = await this.findById(id);
        if(!buscaPostagem) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }
        return await this.postagemRepository.delete(id);
    }
}