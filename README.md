<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Aplikasi ini adalah RESTful API Todo List berbasis [NestJS](https://nestjs.com/) yang menyediakan fitur manajemen user dan todo. API ini mendukung operasi CRUD untuk user dan todo, autentikasi menggunakan JWT, serta penyimpanan data menggunakan database MySQL. Setiap endpoint yang sensitif dilindungi oleh mekanisme authentication token. Tersedia juga pengujian end-to-end (e2e) untuk memastikan keamanan dan fungsionalitas autentikasi serta fitur utama aplikasi.

## Struktur & Pola Project

Project ini menggunakan **pola modular**, yaitu struktur bawaan yang direkomendasikan oleh NestJS.

### Alasan Menggunakan Pola Modular

- **Pemecahan Tanggung Jawab (Separation of Concerns):** Setiap fitur (seperti autentikasi, user, todo) dipisahkan ke dalam modul masing-masing. Hal ini membuat kode lebih terorganisir, mudah dipahami, dan mudah dikelola.
- **Skalabilitas:** Dengan modularisasi, aplikasi mudah dikembangkan. Penambahan fitur baru cukup dengan membuat modul baru tanpa mengganggu kode yang sudah ada.
- **Reusabilitas:** Modul yang sudah dibuat dapat digunakan kembali di bagian lain aplikasi atau bahkan di project lain.
- **Kemudahan Testing:** Batasan yang jelas antar modul membuat proses unit test dan e2e test menjadi lebih mudah dan terstruktur.
- **Manajemen Dependensi:** Setiap modul mengelola dependensinya sendiri, sehingga mengurangi keterkaitan antar bagian dan membuat kode lebih robust.

NestJS merekomendasikan pola ini karena sesuai dengan best practice dalam membangun aplikasi backend yang skalabel dan mudah dipelihara.

## Dokumentasi Collection Postman

Link : https://elements.getpostman.com/redirect?entityId=39478718-14d92089-11b8-46d2-9d52-0e4400e54e5d&entityType=collection

## Project setup

```bash
$ npm install

# Buat file .env dan isi konfigurasi database MySQL, contoh:
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=todo_db
JWT_SECRET=your_jwt_secret
```

### Database & Migration
Buat Database sesuai dengan .env
```bash
# Jalankan migration untuk membuat tabel di database
$ npm run migration:run
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
