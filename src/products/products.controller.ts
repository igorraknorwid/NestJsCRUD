import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/productCreate.dto';
import { EditProductPriceDto } from './dtos/edit_price.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.ProductsService.getProducts();
  }
  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.ProductsService.getProduct(+id);
  }
  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.ProductsService.createProduct(body);
  }
  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.ProductsService.deleteProduct(+id);
  }
  @Patch('/:id')
  editProductPrice(@Param('id') id: string, @Body() body: EditProductPriceDto) {
    return this.ProductsService.editProductPrice(+id, body.price);
  }
}
