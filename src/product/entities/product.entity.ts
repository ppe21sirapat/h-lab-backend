import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EProductSize } from '../enum/product-size.enum';
import { Translation } from '../../language/entities/translation.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: EProductSize,
    default: EProductSize.M,
  })
  size: EProductSize;

  @OneToMany(() => Translation, (translation) => translation.product)
  translation: Translation[];
}
