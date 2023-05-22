import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema } from './user.model';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('UsersController', () => {
  let controller: UsersController;
  let id;
  let mongoUri: string;
  let mongo;
  let app: INestApplication;

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    mongoUri = mongo.getUri();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      providers: [UsersService],
      exports: [UsersService],
      controllers: [UsersController],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    controller = module.get<UsersController>(UsersController);
  });
  afterAll(() => {
    mongo.stop();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('call add user', async () => {
    const a = await controller.addUser(
      'gv.agarwal@gmail.com',
      'test',
      'gaurav',
      ['admin'],
    );
    id = a.id;
    expect(Object.keys(a)).toStrictEqual(['id']);
  });
  it('call get user', async () => {
    const [a] = await controller.getUsers();
    expect(a.id).toBe(id);
  });

  it('call add user1', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'gv.agarwal1@gmail.com',
        password: 'test',
        name: 'gaurav',
        roles: ['admin'],
      })
      .expect(201);
  });

  it('call get user1', async () => {
    const res = await request(app.getHttpServer()).get('/users');
    expect(res.body.length).toBe(2);
  });
});
