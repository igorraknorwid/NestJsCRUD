/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';
export class EditProductPriceDto {
  @IsNumber()
  price: number;
}
