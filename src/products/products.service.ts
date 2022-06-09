/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dtos/product.dto';
import { CreateProductDto } from './dtos/productCreate.dto';
import { Product } from './product.entity';

const products = [
  { id: 1, title: 'Water', price: 10, total: 20 },
  { id: 2, title: 'Bread', price: 12, total: 50 },
  { id: 3, title: 'Pear', price: 15, total: 40 },
];
@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}
  getProducts(): ProductDto[] {
    return products;
  }
  getProduct(id: number): ProductDto {
    return products.find((product) => product.id === id);
  }
  createProduct(body: CreateProductDto) {
    // const id = Math.round(Math.random() * 1000);
    // const newProduct = { id, ...body };
    // products.push(newProduct);
    // return products;
    const newProduct = this.repo.create({ ...body });
    return this.repo.save(newProduct);
  }
  deleteProduct(id: number) {
    return products.filter((product) => product.id !== id);
  }
  editProductPrice(id: number, price: number) {
    const product = products.find((prod) => prod.id === id);
    product.price = price;
    return products;
  }
}
