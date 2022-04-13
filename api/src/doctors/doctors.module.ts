import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { Doctor } from './entities/doctor.entity';
import { Specialty } from './entities/specialty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    TypeOrmModule.forFeature([Specialty]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
