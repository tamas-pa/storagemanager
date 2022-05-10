import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {Product} from './Product';

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  Product: Product;

  @Column('integer')
  amount: number;

  @Column('text')
  name: string;

  @Column('text')
  phone: string;

  @Column('text')
  email: string;

  @Column('text')
  created_at: string;
}
