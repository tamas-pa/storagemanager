import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {ProductPart} from './ProductPart';
import {ProductProductPart} from './ProductProductPart';

@Entity('product')
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @OneToMany(type => ProductPart, productPart => productPart.product, {
    cascade: true,
    eager: true,
  })
  productParts: ProductPart[];

  @OneToMany(type => ProductProductPart, productProductParts => productProductParts.product, {
    cascade: true,
    eager: true,
  })
  productProductParts: ProductProductPart[];
}
