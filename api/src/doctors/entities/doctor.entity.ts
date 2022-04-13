import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Doctor {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column({ length: 120 })
  @ApiProperty()
  name: string;

  @Column({ length: 7 })
  @ApiProperty()
  crm: string;

  @Column({ length: 10 })
  @ApiProperty()
  landline: string;

  @Column({ length: 11 })
  @ApiProperty()
  cellPhone: string;

  @Column({ length: 8 })
  @ApiProperty()
  cep: string;

  @Column()
  @ApiProperty()
  street: string;

  @Column()
  @ApiProperty()
  district: string;

  @Column()
  @ApiProperty()
  city: string;

  @Column({ length: 2 })
  @ApiProperty()
  state: string;

  @Column('simple-array')
  @ApiProperty()
  specialties: string[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
