import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Product} from './Product';

@Entity()
export class ProductProductPart {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Product, product => product.productParts, {
    primary: true,
    onDelete: 'CASCADE',
  })
  product: Product;


  @Column('json')
  usedProduct: Product;

  @Column('integer')
  amount: number;
}
