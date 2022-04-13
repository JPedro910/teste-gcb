jest.setTimeout(20000);

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from '../../entities/doctor.entity';
import { Repository } from 'typeorm';
import { DoctorsService } from '../../doctors.service';
import { doctorsList, databaseDoctors, specialties } from '../mock/data';
import { Specialty } from '../../entities/specialty.entity';

describe('Unit DoctorsService', () => {
  let doctorService: DoctorsService;
  let doctorRepository: Repository<Doctor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        {
          provide: getRepositoryToken(Doctor),
          useValue: {
            save: jest.fn(),
            find: jest.fn().mockReturnValue(databaseDoctors),
            findOne: jest.fn().mockReturnValue(databaseDoctors[0]),
            update: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            find: jest.fn().mockReturnValue(specialties),
          },
        },
      ],
    }).compile();

    doctorService = module.get<DoctorsService>(DoctorsService);
    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );
  });

  it('should be defined', () => {
    expect(doctorService).toBeDefined();
    expect(doctorRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return a error in validation of form fields', async () => {
      jest
        .spyOn(doctorRepository, 'findOne')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
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
      jest.spyOn(doctorRepository, 'findOne').mockResolvedValueOnce(null);
      try {
        await doctorService.create(doctorsList[2]);
      } catch (e) {
        expect(e.message).toBe('Esse telefone fixo já foi cadastrado');
      }
    });

    it('should return a error, because cell phone was alredy register', async () => {
      jest
        .spyOn(doctorRepository, 'findOne')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      try {
        await doctorService.create(doctorsList[3]);
      } catch (e) {
        expect(e.message).toBe('Esse telefone celular já foi cadastrado');
      }
    });

    it('should return a error in cep', async () => {
      jest
        .spyOn(doctorRepository, 'findOne')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      try {
        await doctorService.create(doctorsList[4]);
      } catch (e) {
        expect(e.message).toBe('Esse CEP não existe');
      }
    });

    it('should create user', async () => {
      jest
        .spyOn(doctorRepository, 'findOne')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      const result = await doctorService.create(doctorsList[5]);
      expect(result).toBe(
        JSON.stringify({ message: 'Cadastro criado com sucesso' }),
      );
    });
  });

  describe('findAll', () => {
    it('should findAll doctors', async () => {
      const result = await doctorService.findAll();
      expect(result).toBe(databaseDoctors);
    });
  });

  describe('find', () => {
    it('should find doctors', async () => {
      const result = await doctorService.find('name', 'João');
      expect(result).toBe(databaseDoctors);
    });
  });

  describe('findSpecialties', () => {
    it('should find specialties', async () => {
      const result = await doctorService.findSpecialties();
      expect(result).toBe(specialties);
    });
  });

  describe('update', () => {
    it('should return a error in validation of form fields', async () => {
      jest
        .spyOn(doctorRepository, 'findOne')
        .mockResolvedValueOnce(databaseDoctors[0])
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      try {
        await doctorService.update('1', doctorsList[2]);
      } catch (e) {
        expect(e.message).toBe('Preencha todos os campos');
      }
    });

    it('should return a error, because user is not exists', async () => {
      jest.spyOn(doctorRepository, 'findOne').mockResolvedValueOnce(null);
      try {
        await doctorService.update('3', doctorsList[0]);
      } catch (e) {
        expect(e.message).toBe('Esse cadastro não existe ou já foi excluído');
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
      jest
        .spyOn(doctorRepository, 'findOne')
        .mockResolvedValueOnce(databaseDoctors[0])
        .mockResolvedValueOnce(null);
      try {
        await doctorService.update('1', doctorsList[2]);
      } catch (e) {
        expect(e.message).toBe('Esse telefone fixo já foi cadastrado');
      }
    });

    it('should return a error, because cell phone was alredy register', async () => {
      jest
        .spyOn(doctorRepository, 'findOne')
        .mockResolvedValueOnce(databaseDoctors[0])
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      try {
        await doctorService.update('1', doctorsList[3]);
      } catch (e) {
        expect(e.message).toBe('Esse telefone celular já foi cadastrado');
      }
    });

    it('should return a error in cep', async () => {
      jest
        .spyOn(doctorRepository, 'findOne')
        .mockResolvedValueOnce(databaseDoctors[0])
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      try {
        await doctorService.update('1', doctorsList[4]);
      } catch (e) {
        expect(e.message).toBe('Esse CEP não existe');
      }
    });

    it('should create user', async () => {
      jest
        .spyOn(doctorRepository, 'findOne')
        .mockResolvedValueOnce(databaseDoctors[0])
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      const result = await doctorService.update('1', doctorsList[5]);
      expect(result).toBe(
        JSON.stringify({ message: 'Cadastro atualizado com sucesso' }),
      );
    });
  });

  describe('delete', () => {
    it('should return a error, because user is not exists', async () => {
      jest.spyOn(doctorRepository, 'find').mockRejectedValueOnce([]);

      try {
        await doctorService.remove('3');
      } catch (e) {
        expect(e.message).toBe('Esse cadastro não existe ou já foi excluído');
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
