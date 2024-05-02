import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  public nome: string;

  @IsEmail() //valida se realmente foi digitado um email
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({example: 'email@email.com.br'})
  public usuario: string;

  @MinLength(8) //diz que a senha do usuário deve conter no mínimo 8 caracteres
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  public senha: string;

  @Column({ length: 5000 })
  @ApiProperty()
  public foto: string;

  @ApiProperty()
  @OneToMany(() => Postagem, (postagem) => postagem.usuario)
  postagem: Postagem[];
}
