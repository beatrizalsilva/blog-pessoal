import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        // criptografa a senha antes de ser armazenada no DB
        private bcrypt: Bcrypt
    ) {}

    async findByUsuario(usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {usuario: usuario}
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {postagem: true}
        });
    }

    async findById(id: number): Promise<Usuario> {
        let usuario = await this.usuarioRepository.findOne({
            where: {id},
            relations: {postagem: true}
        });
        if (!usuario) {
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
        }
        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        let buscaUsuario = await this.findByUsuario(usuario.usuario);
        if (!buscaUsuario) {
            if(usuario.foto) {
                usuario.foto = "https://i.pinimg.com/originals/54/bf/7a/54bf7a45856c608fe7165a908d57c7cf.png"
            }
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioRepository.save(usuario);
        }
        throw new HttpException("O Usuario ja existe!", HttpStatus.BAD_REQUEST);
    }

    async update(usuario: Usuario): Promise<Usuario> {
        let updateUsuario: Usuario = await this.findById(usuario.id);
        let buscaUsuario = await this.findByUsuario(usuario.usuario);
        // verifica se o usuário digitou o email correto
        if (!updateUsuario) {
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        }
        // verifica se o corpo da requisição é diferente do id encontrado, se diferente o email existe mas não pertence ao id que será atualizado
        if (buscaUsuario && buscaUsuario.id !== usuario.id) {
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);
        }
        if(usuario.foto) {
            usuario.foto = "https://i.pinimg.com/originals/54/bf/7a/54bf7a45856c608fe7165a908d57c7cf.png"
        }
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }
}