import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Part {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('integer')
  amount: number;

  @Column('text')
  created_at: string;
}
