jest.setTimeout(20000);

import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from '../../doctors.controller';
import { DoctorsService } from '../../doctors.service';
import { doctorsList, databaseDoctors, specialties } from '../mock/data';

describe('Unit DoctorsController', () => {
  let doctorController: DoctorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [
        {
          provide: DoctorsService,
          useValue: {
            create: jest
              .fn()
              .mockReturnValue(
                JSON.stringify({ response: 'Cadastro criado com sucesso' }),
              ),
            findAll: jest.fn().mockReturnValue(databaseDoctors),
            find: jest.fn().mockReturnValue(databaseDoctors),
            findSpecialties: jest.fn().mockReturnValue(specialties),
            update: jest
              .fn()
              .mockReturnValue(
                JSON.stringify({ response: 'Cadastro atualizado com sucesso' }),
              ),
            remove: jest
              .fn()
              .mockReturnValue(
                JSON.stringify({ response: 'Cadastro deletado com sucesso' }),
              ),
          },
        },
      ],
    }).compile();

    doctorController = module.get<DoctorsController>(DoctorsController);
  });

  it('should be defined', () => {
    expect(doctorController).toBeDefined();
  });

  describe('create', () => {
    it('should return a error in validation of form fields', () => {
      jest
        .spyOn(doctorController, 'create')
        .mockRejectedValueOnce(
          new BadRequestException('Preencha todos os campos'),
        );

      expect(doctorController.create(doctorsList[0])).rejects.toThrowError();
    });

    it('should return a error, because crm was alredy register', () => {
      jest
        .spyOn(doctorController, 'create')
        .mockRejectedValueOnce(
          new BadRequestException('Esse CRM j?? foi cadastrado'),
        );

      expect(doctorController.create(doctorsList[1])).rejects.toThrowError();
    });

    it('should return a error, because landline was alredy register', () => {
      jest
        .spyOn(doctorController, 'create')
        .mockRejectedValueOnce(
          new BadRequestException('Esse telefone fixo j?? foi cadastrado'),
        );

      expect(doctorController.create(doctorsList[2])).rejects.toThrowError();
    });

    it('should return a error, because cell phone was alredy register', () => {
      jest
        .spyOn(doctorController, 'create')
        .mockRejectedValueOnce(
          new BadRequestException('Esse telefone celular j?? foi cadastrado'),
        );

      expect(doctorController.create(doctorsList[3])).rejects.toThrowError();
    });

    it('should return a error in cep', () => {
      jest
        .spyOn(doctorController, 'create')
        .mockRejectedValueOnce(new BadRequestException('Esse CEP n??o existe'));

      expect(doctorController.create(doctorsList[4])).rejects.toThrowError();
    });

    it('should create the doctor', async () => {
      const result = doctorController.create(doctorsList[5]);
      expect(result).toBe(
        JSON.stringify({ response: 'Cadastro criado com sucesso' }),
      );
    });
  });

  describe('findAll', () => {
    it('should findAll doctors', async () => {
      const result = doctorController.findAll();
      expect(result).toBe(databaseDoctors);
    });
  });

  describe('find', () => {
    it('should find doctors', async () => {
      const result = doctorController.find('name', 'Jo??o');
      expect(result).toBe(databaseDoctors);
    });
  });

  describe('findSpecialties', () => {
    it('should find specialties', async () => {
      const result = await doctorController.findSpecialties();
      expect(result).toBe(specialties);
    });
  });

  describe('update', () => {
    it('should return a error in validation of form fields', () => {
      jest
        .spyOn(doctorController, 'update')
        .mockRejectedValueOnce(
          new BadRequestException('Preencha todos os campos'),
        );

      expect(
        doctorController.update('1', doctorsList[0]),
      ).rejects.toThrowError();
    });

    it('should return a error, because crm was alredy register', () => {
      jest
        .spyOn(doctorController, 'update')
        .mockRejectedValueOnce(
          new BadRequestException('Esse CRM j?? foi cadastrado'),
        );

      expect(
        doctorController.update('1', doctorsList[0]),
      ).rejects.toThrowError();
    });

    it('should return a error, because landline was alredy register', () => {
      jest
        .spyOn(doctorController, 'update')
        .mockRejectedValueOnce(
          new BadRequestException('Esse telefone fixo j?? foi cadastrado'),
        );

      expect(
        doctorController.update('1', doctorsList[1]),
      ).rejects.toThrowError();
    });

    it('should return a error, because cell phone was alredy register', () => {
      jest
        .spyOn(doctorController, 'update')
        .mockRejectedValueOnce(
          new BadRequestException('Esse telefone celular j?? foi cadastrado'),
        );

      expect(
        doctorController.update('1', doctorsList[2]),
      ).rejects.toThrowError();
    });

    it('should return a error, because user is not exists', () => {
      jest
        .spyOn(doctorController, 'update')
        .mockRejectedValueOnce(
          new NotFoundException('Esse cadastro n??o existe ou j?? foi exclu??do'),
        );

      expect(
        doctorController.update('1', doctorsList[3]),
      ).rejects.toThrowError();
    });

    it('should return a error in get data cep', () => {
      jest
        .spyOn(doctorController, 'update')
        .mockRejectedValueOnce(new BadRequestException('Esse CEP n??o existe'));

      expect(
        doctorController.update('1', doctorsList[4]),
      ).rejects.toThrowError();
    });

    it('should update the doctor', async () => {
      const result = doctorController.update('1', doctorsList[5]);
      expect(result).toBe(
        JSON.stringify({ response: 'Cadastro atualizado com sucesso' }),
      );
    });
  });

  describe('delete', () => {
    it('should return a error, because user is not exists', () => {
      jest
        .spyOn(doctorController, 'remove')
        .mockRejectedValueOnce(
          new NotFoundException('Esse cadastro n??o existe ou j?? foi exclu??do'),
        );

      expect(doctorController.remove('1')).rejects.toThrowError();
    });
    it('should delete the doctor', async () => {
      const result = doctorController.remove('1');
      expect(result).toBe(
        JSON.stringify({ response: 'Cadastro deletado com sucesso' }),
      );
    });
  });
});
