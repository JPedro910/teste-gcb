jest.setTimeout(20000);

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../../entities/doctor.entity';
import { Repository } from 'typeorm';
import { DoctorsService } from '../../doctors.service';
import { Specialty } from '../../entities/specialty.entity';
import { doctorsList, databaseDoctors, specialties } from '../mock/data';
import { database } from '../../../utils/mock/database/config';

describe('Integration DoctorsService', () => {
  let doctorService: DoctorsService;
  let doctorRepository: Repository<Doctor>;
  let specialtyRepository: Repository<Specialty>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorsService],
      imports: [
        TypeOrmModule.forRoot(database),
        TypeOrmModule.forFeature([Doctor]),
        TypeOrmModule.forFeature([Specialty]),
      ],
    }).compile();

    doctorService = module.get<DoctorsService>(DoctorsService);
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
  });

  it('should be defined', () => {
    expect(doctorService).toBeDefined();
    expect(doctorRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should findAll doctors', async () => {
      const result = await doctorService.findAll();
      expect(result.length).toBe(4);
    });
  });

  describe('find', () => {
    it('should find doctors', async () => {
      const result = await doctorService.find('name', 'João');
      expect(result.length).toBe(4);
    });
  });

  describe('findSpecialties', () => {
    it('should find specialties', async () => {
      const result = await doctorService.findSpecialties();
      expect(result.length).toBe(2);
    });
  });

  describe('create', () => {
    it('should return a error in validation of form fields', async () => {
      try {
        await doctorService.create(doctorsList[0]);
      } catch (e) {
        expect(e.message).toBe('Preencha todos os campos');
      }
    });

    it('should return a error, because crm was alredy register', async () => {
      try {
        await doctorService.create(doctorsList[1]);
      } catch (e) {
        expect(e.message).toBe('Esse CRM já foi cadastrado');
      }
    });

    it('should return a error, because landline was alredy register', async () => {
      try {
        await doctorService.create(doctorsList[2]);
      } catch (e) {
        expect(e.message).toBe('Esse telefone fixo já foi cadastrado');
      }
    });

    it('should return a error, because cell phone was alredy register', async () => {
      try {
        await doctorService.create(doctorsList[3]);
      } catch (e) {
        expect(e.message).toBe('Esse telefone celular já foi cadastrado');
      }
    });

    it('should return a error in cep', async () => {
      try {
        await doctorService.create(doctorsList[4]);
      } catch (e) {
        expect(e.message).toBe('Esse CEP não existe');
      }
    });

    it('should create user', async () => {
      const result = await doctorService.create(doctorsList[5]);
      expect(result).toBe(
        JSON.stringify({ message: 'Cadastro criado com sucesso' }),
      );
    });
  });

  describe('update', () => {
    it('should return a error, because user is not exists', async () => {
      try {
        await doctorService.update('9', doctorsList[0]);
      } catch (e) {
        expect(e.message).toBe('Esse cadastro não existe ou já foi excluído');
      }
    });

    it('should return a error in validation of form fields', async () => {
      try {
        await doctorService.update('1', doctorsList[0]);
      } catch (e) {
        expect(e.message).toBe('Preencha todos os campos');
      }
    });

    it('should return a error, because crm was alredy register', async () => {
      try {
        await doctorService.update('2', doctorsList[1]);
      } catch (e) {
        expect(e.message).toBe('Esse CRM já foi cadastrado');
      }
    });

    it('should return a error, because landline was alredy register', async () => {
      try {
        await doctorService.update('1', doctorsList[2]);
      } catch (e) {
        expect(e.message).toBe('Esse telefone fixo já foi cadastrado');
      }
    });

    it('should return a error, because cell phone was alredy register', async () => {
      try {
        await doctorService.update('1', doctorsList[3]);
      } catch (e) {
        expect(e.message).toBe('Esse telefone celular já foi cadastrado');
      }
    });

    it('should return a error in cep', async () => {
      try {
        await doctorService.update('1', doctorsList[4]);
      } catch (e) {
        expect(e.message).toBe('Esse CEP não existe');
      }
    });

    it('should update user', async () => {
      const result = await doctorService.update('1', doctorsList[5]);
      expect(result).toBe(
        JSON.stringify({ message: 'Cadastro atualizado com sucesso' }),
      );
    });
  });

  describe('delete', () => {
    it('should return a error, because user is not exists', async () => {
      try {
        await doctorService.remove('10');
      } catch (e) {
        expect(e.message).toBe('Esse médico não existe ou já foi excluído');
      }
    });
    it('should delete the doctor', async () => {
      const result = await doctorService.remove('1');
      expect(result).toBe(
        JSON.stringify({ message: 'Cadastro deletado com sucesso' }),
      );
    });
  });
});
