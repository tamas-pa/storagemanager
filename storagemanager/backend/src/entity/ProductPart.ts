import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Product} from './Product';
import {Part} from './Part';

@Entity()
export class ProductPart {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Product, product => product.productParts, {
    primary: true,
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column('json')
  usedPart: Part;

  @Column('integer')
  amount: number;
}
