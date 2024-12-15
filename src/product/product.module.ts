import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Translation } from 'src/language/entities/translation.entity';
import { Language } from 'src/language/entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Translation, Language])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
