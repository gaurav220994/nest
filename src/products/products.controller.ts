import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Role, Roles } from 'src/auth/constants';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.Admin)
  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return this.productsService.addProduct(title, description, price);
  }

  @Roles(Role.Admin, Role.User)
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Roles(Role.Admin, Role.User)
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }
}
