import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './products.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<{ id: string }> {
    const newProduct = new this.productModel({ title, description, price });
    const product = await newProduct.save();
    return { id: product.id as string };
  }

  getProducts() {
    return this.productModel.find({});
  }

  getProduct(id) {
    return this.findProduct(id);
  }

  async findProduct(id) {
    const prod = await this.productModel.findOne({ _id: id });
    if (!prod) {
      throw new NotFoundException('Product not found');
    }
    return prod;
  }
}
