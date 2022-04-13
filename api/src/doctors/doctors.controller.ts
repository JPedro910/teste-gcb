import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Error } from '../utils/swagger/error';
import { Response } from '../utils/swagger/response';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Specialty } from './entities/specialty.entity';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar médicos.' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro criado com sucesso',
    type: Response,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: Error,
  })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retornar médicos.' })
  @ApiResponse({
    status: 200,
    description: 'Os médicos foram retornados com sucessos.',
    type: Doctor,
    isArray: true,
  })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Pesquisar médicos.' })
  @ApiResponse({
    status: 200,
    description: 'Os médicos foram pesquisados com sucessos.',
    type: Doctor,
    isArray: true,
  })
  find(@Query('field') field: string, @Query('value') value: string) {
    return this.doctorsService.find(field, value);
  }

  @Get('specialties')
  @ApiOperation({ summary: 'Retornar especialidades.' })
  @ApiResponse({
    status: 200,
    description: 'As especialidades foram retornados com sucessos.',
    type: Specialty,
    isArray: true,
  })
  findSpecialties() {
    return this.doctorsService.findSpecialties();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar médico.' })
  @ApiResponse({
    status: 200,
    description: 'Cadastro atualizado com sucesso',
    type: Response,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: Error,
  })
  @ApiResponse({
    status: 404,
    description: 'Esse médico não existe ou já foi excluído',
    type: Error,
  })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar médico.' })
  @ApiResponse({
    status: 200,
    description: 'Cadastro deletado com sucesso',
    type: Response,
  })
  @ApiResponse({
    status: 404,
    description: 'Esse médico não existe ou já foi excluído',
    type: Error,
  })
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}
