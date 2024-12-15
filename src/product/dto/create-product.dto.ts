import { IsArray, IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { EProductSize } from '../enum/product-size.enum';
import { CreateProductTranslationDto } from './product-translation.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsEnum(EProductSize)
  size: EProductSize;

  @IsNumber()
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductTranslationDto)
  translation: CreateProductTranslationDto[];
}
