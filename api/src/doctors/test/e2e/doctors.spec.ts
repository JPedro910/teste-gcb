jest.setTimeout(20000);

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../../entities/doctor.entity';
import { Repository } from 'typeorm';
import { DoctorsModule } from '../../doctors.module';
import { Specialty } from '../../entities/specialty.entity';
import { INestApplication } from '@nestjs/common';
import { doctorsList, databaseDoctors, specialties } from '../mock/data';
import { database } from '../../../utils/mock/database/config';
import * as request from 'supertest';

describe('E2E', () => {
  let app: INestApplication;
  let doctorRepository: Repository<Doctor>;
  let specialtyRepository: Repository<Specialty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DoctorsModule, TypeOrmModule.forRoot(database)],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );
    specialtyRepository = module.get<Repository<Specialty>>(
      getRepositoryToken(Specialty),
    );

    await doctorRepository.save(databaseDoctors[0]);
    await doctorRepository.save(databaseDoctors[1]);
    await doctorRepository.save(databaseDoctors[2]);
    await doctorRepository.save(databaseDoctors[3]);

    await specialtyRepository.save(specialties[0]);
    await specialtyRepository.save(specialties[1]);
  });

  afterEach(async () => {
    await doctorRepository.delete({});
    await specialtyRepository.delete({});
    await app.close();
  });

  describe('GET /doctors', () => {
    it('should findAll doctors', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/doctors')
        .set('Content-Type', 'application/json');
      expect(statusCode).toBe(200);
      expect(body.length).toBe(4);
    });
  });

  describe('GET /doctors/search', () => {
    it('should find doctors', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/doctors?field=name&value=João')
        .set('Content-Type', 'application/json');
      expect(statusCode).toBe(200);
      expect(body.length).toBe(4);
    });
  });

  describe('GET /doctors/specialties', () => {
    it('should find specialties', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/doctors/specialties')
        .set('Content-Type', 'application/json');
      expect(statusCode).toBe(200);
      expect(body.length).toBe(2);
    });
  });

  describe('POST /doctors', () => {
    it('should return a error in validation of form fields', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/doctors')
        .set('Content-Type', 'application/json')
        .send(doctorsList[0]);
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Preencha todos os campos');
    });

    it('should return a error, because crm was alredy register', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/doctors')
        .set('Content-Type', 'application/json')
        .send(doctorsList[1]);
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Esse CRM já foi cadastrado');
    });

    it('should return a error, because landline was alredy register', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/doctors')
        .set('Content-Type', 'application/json')
        .send(doctorsList[2]);
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Esse telefone fixo já foi cadastrado');
    });

    it('should return a error, because cell phone was alredy register', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/doctors')
        .set('Content-Type', 'application/json')
        .send(doctorsList[3]);
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Esse telefone celular já foi cadastrado');
    });

    it('should return a error in cep', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/doctors')
        .set('Content-Type', 'application/json')
        .send(doctorsList[4]);
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Esse CEP não existe');
    });

    it('should create user', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post('/doctors')
        .set('Content-Type', 'application/json')
        .send(doctorsList[5]);
      expect(statusCode).toBe(201);
    });
  });

  describe('PATCH /doctors', () => {
    it('should return a error, because user is not exists', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch('/doctors/9')
        .set('Content-Type', 'application/json')
        .send(doctorsList[0]);
      expect(statusCode).toBe(404);
      expect(body.message).toBe('Esse cadastro não existe ou já foi excluído');
    });

    it('should return a error in validation of form fields', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch('/doctors/1')
        .set('Content-Type', 'application/json')
        .send(doctorsList[0]);
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Preencha todos os campos');
    });

    it('should return a error, because crm was alredy register', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch('/doctors/2')
        .set('Content-Type', 'application/json')
        .send(doctorsList[1]);
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Esse CRM já foi cadastrado');
    });

    it('should return a error, because landline was alredy register', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch('/doctors/1')
        .set('Content-Type', 'application/json')
        .send(doctorsList[2]);
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Esse telefone fixo já foi cadastrado');
    });

    it('should return a error, because cell phone was alredy register', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch('/doctors/1')
        .set('Content-Type', 'application/json')
        .send(doctorsList[3]);
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Esse telefone celular já foi cadastrado');
    });

    it('should return a error in cep', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch('/doctors/1')
        .set('Content-Type', 'application/json')
        .send(doctorsList[4]);
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Esse CEP não existe');
    });

    it('should update user', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch('/doctors/1')
        .set('Content-Type', 'application/json')
        .send(doctorsList[5]);
      expect(statusCode).toBe(200);
    });
  });

  describe('DELETE /doctors', () => {
    it('should return a error, because user is not exists', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .delete('/doctors/10')
        .set('Content-Type', 'application/json')
        .send(doctorsList[5]);
      expect(statusCode).toBe(404);
      expect(body.message).toBe('Esse médico não existe ou já foi excluído');
    });
    it('should delete the doctor', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete('/doctors/1')
        .set('Content-Type', 'application/json');
      expect(statusCode).toBe(200);
    });
  });
});
