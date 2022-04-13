import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  crm: string;

  @ApiProperty()
  specialties: string[];

  @ApiProperty()
  landline: string;

  @ApiProperty()
  cellPhone: string;

  @ApiProperty()
  cep: string;
}
