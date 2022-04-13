import { CreateDoctorDto } from '../../dto/create-doctor.dto';

export const doctorsList: CreateDoctorDto[] = [
  {
    name: 'João',
    crm: '',
    specialties: ['Cardiologia', 'Pediatria'],
    landline: '',
    cellPhone: '',
    cep: '03451000',
  },

  {
    name: 'João',
    crm: '1234564',
    specialties: ['Cardiologia', 'Pediatria'],
    landline: '1127275800',
    cellPhone: '11958587410',
    cep: '03451000',
  },

  {
    name: 'João Pedro',
    crm: '1234530',
    specialties: ['Cardiologia', 'Pediatria'],
    landline: '1127275802',
    cellPhone: '1196258511',
    cep: '03451000',
  },

  {
    name: 'João Moisés',
    crm: '1234531',
    specialties: ['Cardiologia', 'Pediatria'],
    landline: '1127275899',
    cellPhone: '11958587431',
    cep: '03451000',
  },

  {
    name: 'João Paulo',
    crm: '1234532',
    specialties: ['Cardiologia', 'Pediatria'],
    landline: '1178785858',
    cellPhone: '11978785858',
    cep: '00000000',
  },

  {
    name: 'João Manuel',
    crm: '1234568',
    specialties: ['Cardiologia', 'Pediatria'],
    landline: '1127275844',
    cellPhone: '1196258514',
    cep: '03451000',
  },
];

export const databaseDoctors = [
  {
    id: '1',
    name: 'João',
    crm: '1234564',
    specialties: ['Cardiologia', 'Pediatria'],
    landline: '1127275800',
    cellPhone: '11958587410',
    cep: '03451000',
    street: 'logradouro',
    district: 'bairro',
    city: 'localidade',
    state: 'uf',
    createdAt: new Date('2022-04-06 13:33:19.169509'),
    updatedAt: new Date('2022-04-06 13:33:19.169509'),
    deletedAt: null,
  },

  {
    id: '2',
    name: 'João Pedro',
    crm: '1234565',
    specialties: ['Cardiologia', 'Pediatria'],
    landline: '1127275841',
    cellPhone: '1196258511',
    cep: '03451000',
    street: 'logradouro',
    district: 'bairro',
    city: 'localidade',
    state: 'uf',
    createdAt: new Date('2022-04-06 13:33:19.169509'),
    updatedAt: new Date('2022-04-06 13:33:19.169509'),
    deletedAt: null,
  },

  {
    id: '3',
    name: 'João Moisés',
    crm: '1234566',
    specialties: ['Cardiologia', 'Pediatria'],
    landline: '1127275802',
    cellPhone: '11958587431',
    cep: '03451000',
    street: 'logradouro',
    district: 'bairro',
    city: 'localidade',
    state: 'uf',
    createdAt: new Date('2022-04-06 13:33:19.169509'),
    updatedAt: new Date('2022-04-06 13:33:19.169509'),
    deletedAt: null,
  },

  {
    id: '4',
    name: 'João Paulo',
    crm: '1234567',
    specialties: ['Cardiologia', 'Pediatria'],
    landline: '1127275843',
    cellPhone: '1196258513',
    cep: '03451000',
    street: 'logradouro',
    district: 'bairro',
    city: 'localidade',
    state: 'uf',
    createdAt: new Date('2022-04-06 13:33:19.169509'),
    updatedAt: new Date('2022-04-06 13:33:19.169509'),
    deletedAt: null,
  },
];

export const specialties = [
  { id: '1', name: 'Cardiologia' },
  { id: '2', name: 'Pediatria' },
];
