import { IsNotEmpty } from 'class-validator';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @PrimaryGeneratedColumn() //PK com auto incremento
  @ApiProperty()
  id: number;

  @IsNotEmpty() //define que o valor não pode ser vazio (not full)
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  @ApiProperty()
  texto: string;

  @UpdateDateColumn()
  @ApiProperty()
  data: Date;

  //relação com a tabela tema (n - 1)
  @ApiProperty({type: () => Tema})
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE', //se apagar postagem na tb tema, será apago na tb postagens também
  })
  tema: Tema;

  // relação com a tabela usuário (n - 1)
  @ApiProperty({type: () => Usuario})
  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
