import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Language } from 'src/language/entities/language.entity';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Product, (product) => product.translation)
  product: Product;

  @ManyToOne(() => Language, (language) => language.translation)
  language: Language;
}
