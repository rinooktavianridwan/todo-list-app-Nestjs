import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export async function registerAndLogin(
  app: INestApplication,
  email: string,
  password: string,
  name = 'E2E User',
) {
  // Register user (ignore error if already exists)
  await request(app.getHttpServer())
    .post('/auth/register')
    .send({ email, password, name })
    .catch(() => {});

  // Login user
  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email, password });

  return {
    token: res.body.data.access_token,
    user: res.body.data.user,
  };
}
