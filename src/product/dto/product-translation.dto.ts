import { IsString } from 'class-validator';

export class CreateProductTranslationDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  languageCode: string;
}
