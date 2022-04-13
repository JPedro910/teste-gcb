import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Validation } from './doctor.validation';
import Helper from '../utils/helper/Helper';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
  ) {}

  async create({
    name,
    crm,
    specialties,
    landline,
    cellPhone,
    cep,
  }: CreateDoctorDto): Promise<string | BadRequestException | Error> {
    const validation = await Validation({
      name,
      crm,
      specialties,
      landline,
      cellPhone,
      cep,
    });

    if (validation instanceof Error) {
      throw new BadRequestException(validation.message);
    }

    const doctorCRM = await this.doctorRepository.findOne({
      where: { crm },
    });

    if (doctorCRM) {
      throw new BadRequestException('Esse CRM já foi cadastrado');
    }

    const doctorLanline = await this.doctorRepository.findOne({
      where: { landline },
    });

    if (doctorLanline) {
      throw new BadRequestException('Esse telefone fixo já foi cadastrado');
    }

    const doctorCellPhone = await this.doctorRepository.findOne({
      where: { cellPhone },
    });

    if (doctorCellPhone) {
      throw new BadRequestException('Esse telefone celular já foi cadastrado');
    }

    const getCEPData = await Helper.getCEPData(cep);

    if (getCEPData.erro) {
      throw new BadRequestException('Esse CEP não existe');
    }

    const { logradouro, bairro, localidade, uf } = getCEPData;

    await this.doctorRepository.save({
      id: Helper.createId(),
      name,
      crm,
      specialties,
      landline,
      cellPhone,
      cep,
      street: logradouro,
      district: bairro,
      city: localidade,
      state: uf,
    });

    return JSON.stringify({ message: 'Cadastro criado com sucesso' });
  }

  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find({});
  }

  async find(field: string, value: string): Promise<Doctor[]> {
    return await this.doctorRepository.find({
      where: { [field]: Like(`%${value}%`) },
    });
  }

  async findSpecialties() {
    return await this.specialtyRepository.find({});
  }

  async update(
    id: string,
    { name, crm, specialties, landline, cellPhone, cep }: UpdateDoctorDto,
  ): Promise<string | BadRequestException | NotFoundException | Error> {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
    });

    if (!doctor) {
      throw new NotFoundException(
        'Esse cadastro não existe ou já foi excluído',
      );
    }

    const validation = await Validation({
      name,
      crm,
      specialties,
      landline,
      cellPhone,
      cep,
    });

    if (validation instanceof Error) {
      throw new BadRequestException(validation.message);
    }

    if (doctor.crm !== crm) {
      const doctorCRM = await this.doctorRepository.findOne({
        where: { crm },
      });

      if (doctorCRM) {
        throw new BadRequestException('Esse CRM já foi cadastrado');
      }
    }

    if (doctor.landline !== landline) {
      const doctorLanline = await this.doctorRepository.findOne({
        where: { landline },
      });

      if (doctorLanline) {
        throw new BadRequestException('Esse telefone fixo já foi cadastrado');
      }
    }

    if (doctor.cellPhone !== cellPhone) {
      const doctorCellPhone = await this.doctorRepository.findOne({
        where: { cellPhone },
      });

      if (doctorCellPhone) {
        throw new BadRequestException(
          'Esse telefone celular já foi cadastrado',
        );
      }
    }

    const getCEPData = await Helper.getCEPData(cep);

    if (getCEPData.erro) {
      throw new BadRequestException('Esse CEP não existe');
    }

    const { logradouro, bairro, localidade, uf } = getCEPData;

    await this.doctorRepository.update(
      { id },
      {
        name,
        crm,
        specialties,
        landline,
        cellPhone,
        cep,
        street: logradouro,
        district: bairro,
        city: localidade,
        state: uf,
      },
    );

    return JSON.stringify({ message: 'Cadastro atualizado com sucesso' });
  }

  async remove(id: string): Promise<string | NotFoundException> {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
    });

    if (!doctor) {
      throw new NotFoundException('Esse médico não existe ou já foi excluído');
    }

    await this.doctorRepository.softDelete(id);

    return JSON.stringify({ message: 'Cadastro deletado com sucesso' });
  }
}
