import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { registerAndLogin } from './e2e-utils';

describe('Users API (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let userId: number;
  const testEmail = 'e2euser@example.com';
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

    const loginResult = await registerAndLogin(app, testEmail, testPassword, 'UserE2E');
    jwtToken = loginResult.token;
    userId = loginResult.user.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get all users (protected)', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get user profile (protected)', async () => {
    const res = await request(app.getHttpServer())
      .get('/users/profile')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(testEmail);
  });

  it('should update user name', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ name: 'UserE2E Updated' })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('UserE2E Updated');
  });
});
