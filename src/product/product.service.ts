import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, ILike, QueryRunner, Repository } from 'typeorm';
import { IQueryString } from 'src/decorator/query-string.interface';
import { Translation } from 'src/language/entities/translation.entity';
import { Language } from 'src/language/entities/language.entity';

@Injectable()
export class ProductService {
  logger: Logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    private dataSource: DataSource,
  ) {}

  async getProductList(queryString: IQueryString<Product | unknown[]>) {
    try {
      this.logger.log({
        method: `getProductList`,
        queryString,
      });

      if (queryString.search) {
        queryString.where = [
          {
            ...queryString.where,
            translation: {
              name: ILike(`%${queryString.search}%`),
            },
          },
          {
            ...queryString.where,
            translation: {
              description: ILike(`%${queryString.search}%`),
            },
          },
        ];
      }

      const [product, count]: [Product[], number] =
        await this.productRepository.findAndCount({
          where: queryString.where,
          skip: queryString.skip,
          take: queryString.limit,
          order: queryString.order,
          relations: ['translation'],
        });

      return { data: product, count };
    } catch (error) {
      this.logger.error({
        method: `getProductList`,
      });
      throw error;
    }
  }

  async createProduct({
    size,
    price,
    translation,
  }: CreateProductDto): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    try {
      this.logger.log({
        method: `createProduct`,
        size,
        price,
        translation,
      });

      await queryRunner.connect();
      await queryRunner.startTransaction();
      const queryManagerProduct = queryRunner.manager.getRepository(Product);
      const queryManagerTranslation =
        queryRunner.manager.getRepository(Translation);

      const createdProduct = await queryManagerProduct.save({
        price,
        size,
      });

      if (!createdProduct) {
        throw new InternalServerErrorException('create product fail');
      }

      const insertTranslationData = [];
      for (const translationData of translation) {
        const language = await this.languageRepository.findOne({
          where: { code: translationData.languageCode },
        });

        if (!language) {
          continue;
        }

        const translation = new Translation();
        translation.product = createdProduct;
        translation.language = language;
        translation.name = translationData.name;
        translation.description = translationData.description;

        insertTranslationData.push(translation);
      }

      const createdTranslation = await queryManagerTranslation.insert(
        insertTranslationData,
      );

      await queryRunner.commitTransaction();

      return createdTranslation;
    } catch (error) {
      this.logger.error({
        method: `createProduct`,
        error,
      });
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
