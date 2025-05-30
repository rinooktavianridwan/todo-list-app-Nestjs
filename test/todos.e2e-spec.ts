import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { registerAndLogin } from './e2e-utils';

describe('Todos API (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let todoId: number;
  const testEmail = 'e2etodo@example.com';
  const testPassword = 'password123';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    const loginResult = await registerAndLogin(app, testEmail, testPassword, 'TodoUser');
    jwtToken = loginResult.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a todo', async () => {
    const res = await request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Test Todo', description: 'E2E test todo' })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Test Todo');
    todoId = res.body.data.id;
  });

  it('should get all todos for user', async () => {
    const res = await request(app.getHttpServer())
      .get('/todos')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should get a todo by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(todoId);
  });

  it('should update a todo', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Updated Todo', isDone: true })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Updated Todo');
    expect(res.body.data.isDone).toBe(true);
  });

  it('should delete a todo', async () => {
    await request(app.getHttpServer())
      .delete(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });
});
