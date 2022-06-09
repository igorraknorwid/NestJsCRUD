/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  getProducts() {
    // return products;
    return this.repo.find();
  }
  getProduct(id: number) {
    // return products.find((product) => product.id === id);
    return this.repo.findOne({ where: { id } });
  }
  createProduct(body: CreateProductDto) {
    // const id = Math.round(Math.random() * 1000);
    // const newProduct = { id, ...body };
    // products.push(newProduct);
    // return products;
    const newProduct = this.repo.create({ ...body });
    return this.repo.save(newProduct);
  }
  async deleteProduct(id: number) {
    // return products.filter((product) => product.id !== id);
    // const products = await this.repo.find();
    const product = await this.repo.findOne({ where: { id } });
    await this.repo.remove(product);
    return `${product.title} has been deleted `;
  }
  async editProductPrice(id: number, price: number) {
    const product = await products.find((prod) => prod.id === id);
    product.price = price;
    return this.repo.save(product);
  }
}
