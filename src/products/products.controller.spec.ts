import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductSchema } from './products.model';
import { CanActivate, ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/roles.guard';



export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Mock the behavior of the AuthGuard
    // For example, you can return true to indicate that authentication is successful
    return true;
  }
}
export class MockRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Mock the behavior of the RoleGuard
    // For example, you can return true to indicate that the user has the required role
    return true;
  }
}
describe('UsersController', () => {
  let controller: ProductsController;
  let id;
  let mongoUri: string;
  let mongo;
  let app: INestApplication;

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    mongoUri = mongo.getUri();
  });

  beforeEach(async () => {
    const mock_ForceFailGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
        AuthModule,
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideGuard(AuthGuard)
      .useValue(MockAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(MockRoleGuard)
      .compile();
    app = module.createNestApplication();
    await app.init();

    controller = module.get<ProductsController>(ProductsController);
  });
  afterAll(() => {
    mongo.stop();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('call add product', async () => {
    const a = await controller.addProduct('Prod title', 'Prod desc', 1);
    id = a.id;
    expect(Object.keys(a)).toStrictEqual(['id']);
  });
  it('call get product', async () => {
    const [a] = await controller.getProducts();
    expect(a.id).toBe(id);
  });

  it('call add product1', async () => {
    return request(app.getHttpServer())
      .post('/products')
      .send({
        title: 'Prod title 1',
        description: 'Prod desc 2',
        price: 1,
      })
      .expect(201);
  });

  it('call get product1', async () => {
    const res = await request(app.getHttpServer()).get('/products');
    expect(res.body.length).toBe(2);
  });
});
